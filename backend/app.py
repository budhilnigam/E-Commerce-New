from flask import Flask,session,request,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager as LoginManagerUser, login_required as login_required_user,login_user,logout_user
from flask_login import LoginManager as LoginManagerSeller, login_required as login_required_seller,login_user as login_seller, logout_user as logout_seller
from models import *
from os import curdir
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///'+curdir+'/ecomm.db'
app.app_context().push()
db.init_app(app)
login_manager_user=LoginManagerUser()
login_manager_seller=LoginManagerSeller()
login_manager_user.init_app(app)
login_manager_seller.init_app(app)
login_manager_user.login_view='/user/login'
login_manager_seller.login_view='/'
@login_manager_user.user_loader
def load_user(userid):
    return db.session.get(User,userid)

@login_manager_seller.user_loader
def load_user(userid):
    return db.session.get(Seller,userid)


@app.route('/user/signup',methods=['GET','POST'])
def user_signup():
    email_id=request.form.get['email_id'].data
    if User.query.filter_by(email_id=email_id):
        return {"error":"Another account is already using this account!"},302
    else:
        username=request.form.get['username'].data
        password=Bcrypt.generate_password_hash(request.form.get['password'].data)
        user=User(username=username,email_id=email_id,password=password)
        db.session.add(user)
        db.session.commit()
        return {"message":"Sign Up Successful"},200

@app.route('/user/login',methods=['GET','POST'])
def user_login():
    email_id=request.get_json()['email_id']
    password=request.get_json()['password']
    print(email_id)
    if User.query.filter_by(email_id=email_id) and Bcrypt.check_password_hash(User.query.filter_by(email_id=email_id),password):
        user=User.query.filter_by(email_id=email_id).first()
        login_user(user)
        return {"message":"Successful Login !"},200
    return {"message":"Incorrect Credentials"},302

if __name__=="__main__":
    app.run()