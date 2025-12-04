# Archivo: run.py
from app import create_app, db

app = create_app()


@app.cli.command()
def init_db():
    """Inicializa la base de datos."""
    with app.app_context():
        db.create_all()
        print("✅ Base de datos inicializada correctamente")


if __name__ == '__main__':
    print("🚀 Iniciando servidor de Gestomoney...")
    print(f"📊 Base de datos: gestomoney_db")
    print(f"🔧 Debug mode: {app.config['FLASK_DEBUG']}")
    print(f"🌐 Servidor: http://localhost:5000")
    app.run(host='0.0.0.0', port=5002)
