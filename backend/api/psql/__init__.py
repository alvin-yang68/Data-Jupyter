from backend.api.psql.dataset import dataset
from flask import Blueprint

from .dataset import dataset
from .run import run

# Blueprint Configuration
psql_bp = Blueprint('psql_bp', __name__, url_prefix='/psql')

# Register views
psql_bp.add_url_rule('/dataset', view_func=dataset, methods=['GET', 'POST'])
psql_bp.add_url_rule('/run', view_func=run, methods=['POST'])
