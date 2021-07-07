from flask import Blueprint

from .dataset import dataset
from .run import run

# Blueprint Configuration
mongodb_bp = Blueprint('mongodb_bp', __name__, url_prefix='/mongodb')

# Register views
mongodb_bp.add_url_rule('/dataset', view_func=dataset, methods=['GET', 'POST'])
mongodb_bp.add_url_rule('/run', view_func=run, methods=['POST'])
