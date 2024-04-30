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

@app.route("/products")
def all_products():
    print(Products.query.all())
    products=queryconverter(Products.query.all())
    return {"products":products}