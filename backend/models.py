# coding: utf-8
from flask_sqlalchemy import SQLAlchemy
from datetime import date,timedelta
from flask_login import UserMixin
db = SQLAlchemy()

class Addresses(db.Model):

    addr_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    line1 = db.Column(db.Text, nullable=False)
    line2 = db.Column(db.Text)
    city = db.Column(db.Text, nullable=False)
    state = db.Column(db.Text, nullable=False)
    pincode = db.Column(db.Integer, nullable=False)
    type = db.Column(db.Text, nullable=False, default='primary')
    def __init__(self,line1,city,state,pincode,type='primary',line2=None):
        self.line1=line1
        self.line2=line2
        self.city=city
        self.state=state
        self.pincode=pincode
        self.type=type

class Sellers(db.Model,UserMixin):

    seller_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    seller_name = db.Column(db.Text,nullable=False)
    email_id = db.Column(db.Text, nullable=False,unique=True)
    password = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.ForeignKey(Addresses.addr_id),default=None)

    def __init__(self,username,email_id,password,addr_id=None):
        self.email_id=email_id
        self.user_name=username
        self.password=password
        self.addr_id=addr_id

class Users(db.Model,UserMixin):

    user_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_name = db.Column(db.Text,nullable=False)
    email_id = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.ForeignKey(Addresses.addr_id),default=None)
    role=db.Column(db.String(80),nullable=False,default='customer')

    def __init__(self,username,email_id,password,role='customer',addr_id=None):
        self.email_id=email_id
        self.user_name=username
        self.password=password
        self.addr_id=addr_id
        self.role=role

    def get_id(self):
        return self.user_id

class Categories(db.Model):
    __searchable__=['category_name']
    category_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    category_name = db.Column(db.Text, nullable=False)


class Products(db.Model):
    __searchable__=['product_name','specs','brand']
    product_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    product_image = db.Column(db.String)
    seller_id = db.Column(db.ForeignKey(Users.user_id), nullable=False)
    product_name = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.ForeignKey(Categories.category_id))
    brand = db.Column(db.Text)
    mrp = db.Column(db.Integer,nullable=False)
    price = db.Column(db.Integer, nullable=False)
    specs = db.Column(db.Text, nullable=False, default='' )
    stock = db.Column(db.Integer, nullable=False, default=0 )
    rating = db.Column(db.Numeric(1,1),default=0.0)
    
    def __init__(self,seller_id,product_name,category_id,brand,price,specs,product_image=None,mrp=None,stock=1):
        self.seller_id=seller_id
        self.product_name=product_name
        self.category_id=category_id
        self.brand=brand
        self.price=price
        self.specs=specs
        self.product_image=product_image
        self.mrp=mrp
        self.stock=stock
        self.rating=0.0


class Carts(db.Model):

    cart_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_id = db.Column(db.ForeignKey(Users.user_id), nullable=False)
    product_id = db.Column(db.ForeignKey(Products.product_id), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

    def __init__(self,user_id,product_id,quantity):
        self.user_id=user_id
        self.product_id=product_id
        self.quantity=quantity

class Feedbacks(db.Model):
    f_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.ForeignKey(Users.user_id), nullable=False)
    product_id = db.Column(db.ForeignKey(Products.product_id), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text)


    def __init__(self,user_id,product_id,rating,review=None):
        self.user_id=user_id
        self.product_id=product_id
        self.rating=rating
        self.review=review

class Orders(db.Model):

    order_id = db.Column(db.Integer, primary_key=True,autoincrement=True)
    product_id = db.Column(db.ForeignKey(Products.product_id), nullable=False)
    user_id = db.Column(db.ForeignKey(Users.user_id), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False,default=1)
    date_order = db.Column(db.Text, nullable=False)
    date_delivery = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.Integer, nullable=False)
    status =db.Column(db.String(20),nullable=False,default='pending')

    def __init__(self,product_id,user_id,price,quantity,addr_id):
        self.product_id=product_id
        self.user_id=user_id
        self.price=price
        self.quantity=quantity
        self.addr_id=addr_id
        self.date_order=date.today()
        self.status='pending'
        self.date_delivery=date.today()+timedelta(days=5)

class ProductHistory(db.Model):

    ph_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    product_id = db.Column(db.ForeignKey(Products.product_id), nullable=False)
    date = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    def __init__(self,product_id,price):
        self.product_id=product_id
        self.price=price
        self.date=date.today()

class Wishlists(db.Model):
    w_id=db.Column(db.Integer,primary_key=True,autoincrement=True)
    user_id = db.Column(db.ForeignKey(Users.user_id), nullable=False)
    product_id = db.Column(db.ForeignKey(Products.product_id), nullable=False)


    def __init__(self,user_id,product_id):
        self.user_id=user_id
        self.product_id=product_id