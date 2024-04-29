from flask import Flask,session,request,redirect,url_for
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager,current_user,login_required,login_user,logout_user
from models import *
import os
app=Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:///'+ os.path.join(basedir, 'ecomm.db')
app.config['SECRET_KEY']="gsjg2"
app.app_context().push()
db.init_app(app)
bcrypt=Bcrypt(app)
login_manager_user=LoginManager()
login_manager_user.init_app(app)
login_manager_user.login_view='/user/login'
@login_manager_user.user_loader
def load_user(userid):
    return db.session.get(User,userid)

@app.route('/user/signup',methods=['GET','POST'])
def user_signup():
    response=request.get_json()
    username=response['username']
    email_id=response['email_id']
    password=response['password']
    print(response)
    if User.query.filter_by(email_id=email_id).first():
        return {"error":"Another account is already using this account!"},302
    else:
        encryptpassword=bcrypt.generate_password_hash(password=password)
        user=User(username=username,email_id=email_id,password=encryptpassword)
        db.session.add(user)
        db.session.commit()
        return {"message":"Sign Up Successful"},200

@app.route('/user/login',methods=['GET','POST'])
def user_login():
    response=request.get_json()
    email_id=response['email_id']
    password=response['password']

    print(response)
    if User.query.filter_by(email_id=email_id).first() and bcrypt.check_password_hash(db.session.query(User.password).filter(User.email_id==email_id).scalar(),password):
        user=User.query.filter_by(email_id=email_id).first()
        login_user(user)
        return {"message":"Successful Login !"},200
    return {"message":"Incorrect Credentials"},202

@app.route("/user")
def about_user():
    if current_user.is_authenticated:
        return {"status":"authenticated","user_id":current_user.user_id}
    else:
        return {"status":"notauthenticated"}

@app.route("/user/logout")
def user_logout():
    logout_user()
    return {"message":"Logout successful"}
if __name__=="__main__":
    app.run()