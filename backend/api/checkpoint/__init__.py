from flask import Blueprint

from .detail import checkpoint_detail
from .list import checkpoint_list

# Blueprint Configuration
checkpoint_bp = Blueprint('checkpoint_bp', __name__, url_prefix='/checkpoint')

# Register views
checkpoint_bp.add_url_rule(
    '/<id>', view_func=checkpoint_detail, methods=['GET'])
checkpoint_bp.add_url_rule(
    '', view_func=checkpoint_list, methods=['GET', 'POST'])
