from flask import Flask
from flask_pymongo import PyMongo

from .config import Config

# Globally accessible libraries
mongo = PyMongo()


def init_app():
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False,
                static_url_path='/', static_folder='../frontend/build')
    app.config.from_object(Config)

    # Initialize Plugins
    mongo.init_app(app)

    with app.app_context():
        # Import parts of our application
        from .index import index
        from .api_v1 import api_v1

        # Register Blueprints
        app.register_blueprint(index.index_bp)
        app.register_blueprint(api_v1.api_v1_bp)

        return app
