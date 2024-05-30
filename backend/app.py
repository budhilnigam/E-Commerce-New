from flask import Flask,session,request,send_file
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager,current_user,login_required,login_user,logout_user
from models import *
from datetime import date,datetime
import os
from flask_msearch import Search
from flask_cors import CORS
app=Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///'+ os.path.join(basedir, 'ecomm.db')
app.config['SECRET_KEY']="gsjg2"
app.config['WHOOSH_BASE']='whoosh'
cors=CORS(app)
app.app_context().push()
db.init_app(app)
bcrypt=Bcrypt(app)
search = Search(db=db)
search.init_app(app)
login_manager_user=LoginManager()
login_manager_user.init_app(app)
login_manager_user.login_view='/user/login'

# load users, roles for a session

@login_manager_user.user_loader
def load_user(userid):
    return db.session.get(Users,userid)

import client
@app.route('/user/signup',methods=['GET','POST'])
def user_signup():
    response=request.get_json()
    username=response['username']
    email_id=response['email_id']
    password=response['password']
    if Users.query.filter_by(email_id=email_id).first():
        return {"message":"Another account is already using this Email ID!"},302
    else:
        encryptpassword=bcrypt.generate_password_hash(password=password)
        user=Users(username=username,email_id=email_id,password=encryptpassword)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return {"message":"Successful Signup"},200

@app.route('/user/login',methods=['GET','POST'])
def user_login():
    response=request.get_json()
    email_id=response['email_id']
    password=response['password']

    print(response)
    if Users.query.filter_by(email_id=email_id).first() and bcrypt.check_password_hash(db.session.query(Users.password).filter(Users.email_id==email_id).scalar(),password):
        user=Users.query.filter_by(email_id=email_id).first()
        login_user(user)
        return {"message":"Successful Login"},200
    return {"message":"Invalid Credentials"},401

@app.route("/user")
def authentication_result():
    if current_user.is_authenticated:
        return {"status":"authenticated","user_id":current_user.user_id},200
    else:
        return {"status":"notauthenticated"},302

@app.route("/user/logout")
def user_logout():
    logout_user()
    return {"message":"Logout successful"}


for i in Orders.query.filter_by(status='pending').all():
    if(i.date_delivery<=str(date.today())):
        i.status='delivered'
        db.session.commit()

if __name__=="__main__":
    app.run(debug=True)