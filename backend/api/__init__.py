from flask import Blueprint

from .run import run_bp
from .checkpoint import checkpoint_bp

# Blueprint Configuration
api_bp = Blueprint('api_bp', __name__, url_prefix='/api')

# Register nested blueprints
api_bp.register_blueprint(run_bp)
api_bp.register_blueprint(checkpoint_bp)
