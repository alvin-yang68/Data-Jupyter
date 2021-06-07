from flask import Flask
from flask_pymongo import PyMongo

from .config import Config

# Globally accessible libraries
mongo = PyMongo()


def init_app():
    """Initialize the core application."""
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object(Config)

    # Initialize Plugins
    mongo.init_app(app)

    with app.app_context():
        # Import parts of our application
        from .index import index
        from .mongodb_cleaner import mongodb_cleaner
        from .neo4j_cleaner import neo4j_cleaner

        # Register Blueprints
        app.register_blueprint(index.index_bp)
        app.register_blueprint(mongodb_cleaner.mongodb_cleaner_bp)
        app.register_blueprint(neo4j_cleaner.neo4j_cleaner_bp)

        return app
