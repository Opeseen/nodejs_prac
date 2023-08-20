from flask import Flask
from pymongo import MongoClient, errors;
from .config import connection

try:
    client = MongoClient(connection,27017)
    db = client.bookstore
    invoice = db.invoice

    def create_app():
        app = Flask(__name__)
        app.config['SECRET_KEY'] = 'admin'
        
        from .views import views
        from .auth import auth

        app.register_blueprint(views,url_prefix='/')
        app.register_blueprint(auth,url_prefix='/')

        return app

except errors.ServerSelectionTimeoutError as err:
    print('Connection Error')
    print(err)