from dotenv import load_dotenv
import os

load_dotenv()

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from app.config import Config

db = SQLAlchemy()
bcrypt = Bcrypt()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='static')
    app.config.from_object(config_class)
    
    db.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    
    # --- MODIFICACIÓN CLAVE AQUÍ ---
    # Cambiamos la lista de "localhost" por "*"
    # Esto permite que tu Frontend en Render (y cualquier otro) pueda conectarse sin errores.
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    from app.routes import main
    app.register_blueprint(main)
    
    return app
