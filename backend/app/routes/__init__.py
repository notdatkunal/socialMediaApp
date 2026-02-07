from flask import Blueprint

auth_bp = Blueprint("auth", __name__)

from app.routes.auth import *  # noqa: E402, F401
