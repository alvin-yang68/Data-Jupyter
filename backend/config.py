import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    MONGO_URI = os.environ.get(
        'MONGODB_URI') or 'mongodb+srv://Alvin:R2y7sefqZJL9cXp0@cluster0.xhr3k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
