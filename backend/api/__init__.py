from flask import Blueprint

from .mongodb import mongodb_bp
from .psql import psql_bp
from .checkpoint import checkpoint_bp
from .commons import reset_context

# Blueprint Configuration
api_bp = Blueprint('api_bp', __name__, url_prefix='/api')

# Register nested blueprints
api_bp.register_blueprint(mongodb_bp)
api_bp.register_blueprint(psql_bp)
api_bp.register_blueprint(checkpoint_bp)

# Register URLs
api_bp.add_url_rule('/reset', view_func=reset_context, methods=['GET'])
