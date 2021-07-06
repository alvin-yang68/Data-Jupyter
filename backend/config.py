import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    MONGO_USER_URI = os.environ.get('MONGO_USER_URI')
    MONGO_DATA_URI = os.environ.get('MONGO_DATA_URI')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace("postgres://", "postgresql://", 1)
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
    GOOGLE_SEARCH_ENGINE_ID = os.environ.get('GOOGLE_SEARCH_ENGINE_ID')
