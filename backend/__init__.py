from flask import Flask
from flask_pymongo import PyMongo
from flask_sqlalchemy import SQLAlchemy

from .config import Config

# Globally accessible libraries
mongo_checkpoint = PyMongo()
mongo_demo = PyMongo()
psql = SQLAlchemy()


def init_app():
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False,
                static_url_path='/', static_folder='../frontend/build')
    app.config.from_object(Config)

    # Initialize Plugins
    mongo_checkpoint.init_app(app, uri=app.config['MONGO_USER_URI'])
    mongo_demo.init_app(app, uri=app.config['MONGO_DATA_URI'])
    psql.init_app(app)

    with app.app_context():
        # Import parts of our application
        from .index import index_bp
        from .api import api_bp

        # Register Blueprints
        app.register_blueprint(index_bp)
        app.register_blueprint(api_bp)

        return app
