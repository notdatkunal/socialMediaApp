import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS

db = SQLAlchemy()
jwt = JWTManager()


def create_app(config=None):
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "your-secret-key-change-in-production"
    instance_path = os.path.join(os.path.dirname(app.root_path), "instance")
    os.makedirs(instance_path, exist_ok=True)
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(instance_path, "social_media.db")
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "jwt-secret-key-change-in-production"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400  # 24 hours

    if config:
        app.config.update(config)

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    db.init_app(app)
    jwt.init_app(app)

    with app.app_context():
        db.create_all()

    from app.routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    return app
