from __main__ import app
from models import *
from flask import jsonify,json

def queryconverter(query):
    result=[]
    for i in query:
        result.append({})
        for j in i.__dict__:
            if j!='_sa_instance_state':
                result[len(result)-1][j]=i.__dict__[j]
    return result

def singlequeryconverter(query):
    result={}
    for j in query.__dict__:
            if j!='_sa_instance_state':
                result[j]=query.__dict__[j]
    return result

def dbqueryconverter(query):
    result=[]
    for r in query:
        result.append({})
        for i in range(len(query.column_descriptions)):
            result[len(result)-1][query.column_descriptions[i]['name']]=getattr(r,query.column_descriptions[i]['name'])
    return result


@app.route("/products/<string:category>")
def list_of_products(category):
    if category=="all":
        products=queryconverter(Products.query.all())
    elif category=="laptops":
        #print(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.brand,Products.rating).filter(Categories.category_name=='laptop').all())
        products=dbqueryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.brand,Products.rating).filter(Categories.category_name=='laptop'))
    elif category=="mobiles":
        products=queryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.brand,Products.rating).join(Categories).filter(Categories.category_name=='phone').all())
    return {"products":products}

@app.route("/product/<int:product_id>")
def product_details(product_id):
    if Products.query.filter_by(product_id=product_id).first():
        return {"details":singlequeryconverter(Products.query.filter_by(product_id=product_id).first())},200
    else:
        return {"message":"Not found"},404