from flask import Flask,session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
app=Flask(__name__)
db=SQLAlchemy(app)
