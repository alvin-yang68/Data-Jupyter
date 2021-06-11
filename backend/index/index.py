from flask import Blueprint, send_from_directory
from flask import current_app as app

# Blueprint Configuration
index_bp = Blueprint('index_bp', __name__)


@index_bp.route('/')
@index_bp.route('/index')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@index_bp.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')
