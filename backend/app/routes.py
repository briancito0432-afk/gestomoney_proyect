# Archivo: app/routes.py
from flask import Blueprint, request, jsonify
from app import db, bcrypt
from app.models import User, Category, Transaction
from datetime import datetime, timedelta
from functools import wraps
import jwt
import os

# Blueprint
main = Blueprint('main', __name__)

# --- DECORADOR DE AUTENTICACIÓN ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'message': 'Token de autenticación requerido'}), 401

        try:
            data = jwt.decode(
                token,
                os.environ.get('JWT_SECRET_KEY', 'dev-jwt-secret-key'),
                algorithms=['HS256']
            )
            current_user = User.query.filter_by(id=data['user_id']).first()
            if not current_user:
                return jsonify({'message': 'Usuario no encontrado'}), 401
        
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado. Inicia sesión nuevamente'}), 401
        except Exception as e:
            print(f"Error al decodificar token: {e}")
            return jsonify({'message': 'Token inválido'}), 401

        return f(current_user, *args, **kwargs)
    return decorated

# --- FUNCIÓN PARA CREAR CATEGORÍAS POR DEFECTO ---
def create_default_categories(user_id):
    """Crea categorías iniciales para un nuevo usuario."""
    default_categories = [
        {'name': 'Salario', 'type': 'INCOME', 'is_default': True},
        {'name': 'Regalo', 'type': 'INCOME', 'is_default': True},
        {'name': 'Comida y Bebidas', 'type': 'EXPENSE', 'is_default': True},
        {'name': 'Vivienda', 'type': 'EXPENSE', 'is_default': True},
        {'name': 'Transporte', 'type': 'EXPENSE', 'is_default': True},
        {'name': 'Ocio y Viajes', 'type': 'EXPENSE', 'is_default': True},
    ]
    for cat in default_categories:
        db.session.add(Category(user_id=user_id, **cat))

# --- RUTAS DE AUTENTICACIÓN ---

@main.route('/api/register', methods=['POST'])
def register():
    """Registra un nuevo usuario."""
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    full_name = data.get('fullName')
    
    if not email or not password or not full_name:
        return jsonify({'message': 'Faltan datos requeridos'}), 400
         
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'El email ya está registrado'}), 409

    try:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(full_name=full_name, email=email, password_hash=hashed_password)
        db.session.add(new_user)
        db.session.flush()
        create_default_categories(new_user.id)
        db.session.commit()
        return jsonify({'message': 'Usuario registrado con éxito'}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error al registrar usuario: {e}")
        return jsonify({'message': 'Error interno al registrar el usuario'}), 500

@main.route('/api/login', methods=['POST'])
def login():
    """Autentica un usuario y devuelve un Token JWT."""
    data = request.get_json()
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Faltan datos (email o password)'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password_hash, data['password']):
        token_payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        
        token = jwt.encode(
            token_payload,
            os.environ.get('JWT_SECRET_KEY', 'dev-jwt-secret-key'),
            algorithm='HS256'
        )
        
        return jsonify({
            'message': 'Login exitoso',
            'token': token,
            'user_name': user.full_name
        }), 200
    else:
        return jsonify({'message': 'Email o contraseña incorrectos'}), 401

# --- RUTAS DE CATEGORÍAS ---

@main.route('/api/categories', methods=['GET'])
@token_required
def get_categories(current_user):
    """Devuelve la lista de categorías del usuario."""
    try:
        categories = Category.query.filter_by(user_id=current_user.id).all()
        categories_list = [{
            'id': c.id,
            'name': c.name,
            'type': c.type,
            'is_default': c.is_default
        } for c in categories]
        return jsonify(categories_list), 200
    except Exception as e:
        print(f"Error al obtener categorías: {e}")
        return jsonify({'message': 'Error interno al cargar categorías'}), 500

# --- RUTAS DE DASHBOARD ---

@main.route('/api/data/summary', methods=['GET'])
@token_required
def get_dashboard_summary(current_user):
    """Obtiene datos de resumen financiero del mes en curso."""
    user_id = current_user.id
    today = datetime.now()
    start_of_month = today.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
    
    # Calcular Ingresos Totales
    total_income_raw = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == user_id, Transaction.type == 'INCOME',
        Transaction.transaction_date >= start_of_month
    ).scalar()
    total_income = float(total_income_raw) if total_income_raw else 0.0

    # Calcular Gastos Totales
    total_expenses_raw = db.session.query(db.func.sum(Transaction.amount)).filter(
        Transaction.user_id == user_id, Transaction.type == 'EXPENSE',
        Transaction.transaction_date >= start_of_month
    ).scalar()
    total_expenses = float(total_expenses_raw) if total_expenses_raw else 0.0
    
    # Balance
    current_balance = total_income - total_expenses
    
    # Desglose de gastos por categoría
    category_spending = db.session.query(
        Category.name, db.func.sum(Transaction.amount).label('total')
    ).join(Transaction).filter(
        Transaction.user_id == user_id, Transaction.type == 'EXPENSE',
        Transaction.transaction_date >= start_of_month
    ).group_by(Category.name).all()
    
    categories_list = [{'name': name, 'total': float(total)} for name, total in category_spending]

    # Respuesta JSON
    return jsonify({
        'user_name': current_user.full_name,
        'summary': {
            'total_balance': float(current_balance),
            'monthly_income': float(total_income),
            'monthly_expenses': float(total_expenses),
            'balance_change': 0.025  # Placeholder
        },
        'categories_spending': categories_list,
        'message': 'Dashboard data loaded successfully'
    }), 200

# --- RUTAS DE TRANSACCIONES (CRUD) ---

@main.route('/api/transactions', methods=['POST'])
@token_required
def create_transaction(current_user):
    """Crea una nueva transacción."""
    data = request.get_json()
    user_id = current_user.id
    
    if not data or not data.get('amount') or not data.get('type') or not data.get('category_id') or not data.get('date'):
        return jsonify({'message': 'Faltan campos esenciales'}), 400

    try:
        amount = float(data['amount'])
        if amount <= 0:
            return jsonify({'message': 'El monto debe ser positivo'}), 400
            
        trans_type = data['type'].upper()
        if trans_type not in ['INCOME', 'EXPENSE']:
            return jsonify({'message': 'Tipo de transacción inválido'}), 400

        category_id = int(data['category_id'])
        transaction_date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        
        category = Category.query.filter_by(id=category_id, user_id=user_id).first()
        if not category:
            return jsonify({'message': 'Categoría no encontrada'}), 404
        
        new_transaction = Transaction(
            user_id=user_id,
            category_id=category_id,
            amount=amount,
            type=trans_type,
            description=data.get('description'),
            transaction_date=transaction_date
        )
        
        db.session.add(new_transaction)
        db.session.commit()
        
        return jsonify({
            'message': 'Transacción registrada con éxito',
            'id': new_transaction.id
        }), 201

    except ValueError:
        return jsonify({'message': 'Error de formato en los datos'}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Error al crear transacción: {e}")
        return jsonify({'message': 'Error interno al procesar la transacción'}), 500

@main.route('/api/transactions', methods=['GET'])
@token_required
def list_transactions(current_user):
    """Lista las transacciones del usuario con filtros opcionales."""
    user_id = current_user.id
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    transaction_type = request.args.get('type')
    category_id = request.args.get('category_id', type=int)
    
    query = Transaction.query.filter_by(user_id=user_id)
    
    if start_date:
        try:
            query = query.filter(Transaction.transaction_date >= datetime.strptime(start_date, '%Y-%m-%d').date())
        except ValueError:
            return jsonify({'message': 'Formato de fecha de inicio inválido'}), 400

    if end_date:
        try:
            query = query.filter(Transaction.transaction_date <= datetime.strptime(end_date, '%Y-%m-%d').date())
        except ValueError:
            return jsonify({'message': 'Formato de fecha de fin inválido'}), 400

    if transaction_type and transaction_type in ['INCOME', 'EXPENSE']:
        query = query.filter_by(type=transaction_type)
        
    if category_id:
        query = query.filter_by(category_id=category_id)

    transactions = query.order_by(Transaction.transaction_date.desc()).all()
    
    transaction_list = []
    for t in transactions:
        category = Category.query.get(t.category_id)
        
        transaction_list.append({
            'id': t.id,
            'amount': float(t.amount),
            'type': t.type,
            'description': t.description,
            'date': t.transaction_date.strftime('%Y-%m-%d'),
            'category_id': t.category_id,
            'category_name': category.name if category else 'Desconocida'
        })
        
    return jsonify({
        'transactions': transaction_list,
        'count': len(transaction_list),
        'message': 'Lista de transacciones cargada con éxito'
    }), 200

@main.route('/api/transactions/<int:transaction_id>', methods=['PUT'])
@token_required
def update_transaction(current_user, transaction_id):
    """Actualiza una transacción existente."""
    data = request.get_json()
    user_id = current_user.id
    
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
    
    if not transaction:
        return jsonify({'message': 'Transacción no encontrada'}), 404

    try:
        if 'amount' in data:
            amount = float(data['amount'])
            if amount <= 0:
                return jsonify({'message': 'El monto debe ser positivo'}), 400
            transaction.amount = amount
            
        if 'type' in data:
            transaction_type = data['type'].upper()
            if transaction_type not in ['INCOME', 'EXPENSE']:
                return jsonify({'message': 'Tipo de transacción inválido'}), 400
            transaction.type = transaction_type
            
        if 'category_id' in data:
            category_id = int(data['category_id'])
            category = Category.query.filter_by(id=category_id, user_id=user_id).first()
            if not category:
                return jsonify({'message': 'Categoría no encontrada'}), 404
            transaction.category_id = category_id
            
        if 'description' in data:
            transaction.description = data['description']
            
        if 'date' in data:
            transaction.transaction_date = datetime.strptime(data['date'], '%Y-%m-%d').date()

        db.session.commit()
        
        return jsonify({'message': 'Transacción actualizada con éxito'}), 200

    except ValueError:
        return jsonify({'message': 'Error de formato en los datos'}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Error al actualizar transacción: {e}")
        return jsonify({'message': 'Error interno al actualizar la transacción'}), 500

@main.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
@token_required
def delete_transaction(current_user, transaction_id):
    """Elimina una transacción."""
    user_id = current_user.id
    
    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
    
    if not transaction:
        return jsonify({'message': 'Transacción no encontrada'}), 404

    try:
        db.session.delete(transaction)
        db.session.commit()
        
        return jsonify({'message': 'Transacción eliminada con éxito'}), 200

    except Exception as e:
        db.session.rollback()
        print(f"Error al eliminar transacción: {e}")
        return jsonify({'message': 'Error interno al eliminar la transacción'}), 500