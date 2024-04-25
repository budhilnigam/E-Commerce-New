# coding: utf-8
from flask_sqlalchemy import SQLAlchemy
from datetime import date,timedelta

db = SQLAlchemy()



class Address(db.Model):
    __tablename__ = 'Addresses'

    addr_id = db.Column(db.Integer, primary_key=True)
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


class Category(db.Model):
    __tablename__ = 'Categories'

    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.Text, nullable=False)



class Feedback(db.Model):
    __tablename__ = 'Feedbacks'

    user_id = db.Column(db.ForeignKey('Users.user_id'), nullable=False)
    product_id = db.Column(db.ForeignKey('Products.product_id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text)

    product = db.relationship('Product', primaryjoin='Feedback.product_id == Product.product_id')
    user = db.relationship('User', primaryjoin='Feedback.user_id == User.user_id')

    def __init__(self,user_id,product_id,rating,review=None):
        self.user_id=user_id
        self.product_id=product_id
        self.rating=rating
        self.review=review

class Order(db.Model):
    __tablename__ = 'Orders'

    order_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.ForeignKey('Products.product_id'), nullable=False)
    user_id = db.Column(db.ForeignKey('Users.user_id'), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    date_order = db.Column(db.Text, nullable=False)
    date_delivery = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', primaryjoin='Order.product_id == Product.product_id')
    user = db.relationship('User', primaryjoin='Order.user_id == User.user_id')

    def __init__(self,product_id,user_id,price,addr_id):
        self.product_id=product_id
        self.user_id=user_id
        self.price=price
        self.addr_id=addr_id
        self.date_order=date.today()
        self.date_delivery=date.today()+timedelta(days=5)

class ProductHistory(db.Model):
    __tablename__ = 'ProductHistory'

    product_id = db.Column(db.ForeignKey('Products.product_id'), nullable=False)
    date = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False)

    product = db.relationship('Product', primaryjoin='ProductHistory.product_id == Product.product_id')

    def __init__(self,product_id,price):
        self.product_id=product_id
        self.price=price
        self.date=date.today()

class Product(db.Model):
    __tablename__ = 'Products'

    product_id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.ForeignKey('Sellers.seller_id'), nullable=False)
    product_name = db.Column(db.Text, nullable=False)
    category_id = db.Column(db.Integer)
    brand = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)
    specs = db.Column(db.Text, nullable=False, default=' ')

    seller = db.relationship('Seller', primaryjoin='Product.seller_id == Seller.seller_id')
    users = db.relationship('User', secondary='Wishlists')

    def __init__(self,seller_id,product_name,category_id,brand,price,specs):
        self.seller_id=seller_id
        self.product_name=product_name
        self.category_id=category_id
        self.brand=brand
        self.price=price
        self.specs=specs

class Seller(db.Model):
    __tablename__ = 'Sellers'

    seller_id = db.Column(db.Integer, primary_key=True)
    email_id = db.Column(db.Text, nullable=False)
    seller_name = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.Integer)

    def __init__(self,email_id,seller_name,addr_id=None):
        self.email_id=email_id
        self.seller_name=seller_name
        self.addr_id=addr_id

class User(db.Model):
    __tablename__ = 'Users'

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text,nullable=False)
    email_id = db.Column(db.Text, nullable=False,unique=True)
    password = db.Column(db.Text, nullable=False)
    addr_id = db.Column(db.ForeignKey('Addresses.addr_id'))

    addr = db.relationship('Address', primaryjoin='User.addr_id == Address.addr_id')

    def __init__(self,username,email_id,password,addr_id=None):
        self.email_id=email_id
        self.username=username
        self.password=password
        self.addr_id=addr_id

class Wishlist(db.Model):
    __tablename__ = 'Wishlists'

    user_id = db.Column(db.ForeignKey('Users.user_id'), nullable=False)
    product_id = db.Column(db.ForeignKey('Products.product_id'), nullable=False)

    product = db.relationship('Product', primaryjoin='Wishlist.product_id == Product.product_id')
    user = db.relationship('User', primaryjoin='Wishlist.user_id == User.user_id')

    def __init__(self,user_id,product_id):
        self.user_id=user_id
        self.product_id=product_id