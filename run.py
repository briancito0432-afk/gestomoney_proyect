import os
from app import create_app, db

app = create_app()

@app.cli.command()
def init_db():
    """Inicializa la base de datos."""
    with app.app_context():
        db.create_all()
        print("✅ Base de datos inicializada correctamente")

if __name__ == '__main__':
    # Railway asigna un puerto en la variable de entorno 'PORT'
    # Si no existe (local), usamos el 5002
    port = int(os.environ.get("PORT", 5002))
    
    # Verificamos si estamos en modo debug (opcional, por defecto False en prod)
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() in ["true", "1", "t"]

    print("🚀 Iniciando servidor de Gestomoney...")
    print(f"📊 Base de datos: {os.environ.get('DB_NAME', 'gestomoney_db')}")
    print(f"🔧 Debug mode: {debug_mode}")
    print(f"🌐 Servidor escuchando en puerto: {port}")
    
    # Importante: host='0.0.0.0' es necesario para que Railway vea tu app
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
