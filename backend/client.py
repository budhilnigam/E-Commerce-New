from __main__ import app,current_user
from models import *
from flask import jsonify,json,request,send_file,url_for
from sqlalchemy import func

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

['__abstractmethods__', '__class__', '__class_getitem__', '__contains__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__iter__', '__le__', '__len__', '__lt__', '__module__', '__ne__', '__new__', '__orig_bases__', '__parameters__', '__pyx_vtable__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', '__setattr__', '__setstate__', '__sizeof__', '__slots__', '__str__', '__subclasshook__', '_abc_impl', '_asdict', '_data', '_fields', '_filter_on_values', '_get_by_key_impl_mapping', '_is_protocol', '_key_to_index', '_mapping', '_op', '_parent', '_special_name_accessor', '_t', '_to_tuple_instance', '_tuple', '_values_impl', 'count', 'index', 't', 'tuple']
def dbqueryconverter(query):
    result=[]
    for r in query:
        result.append({})
        for j in r._mapping:
            result[len(result)-1][j]=r._mapping[j]
    return result


@app.route("/products/<string:category>")
def list_of_products(category):
    if category=="all":
        products=dbqueryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.stock,Products.brand,Products.rating,func.count(Orders.order_id).label('order_count')).join(Categories,Products.category_id==Categories.category_id).outerjoin(Orders,Orders.product_id==Products.product_id).group_by(Products.product_id).all())
    elif category=="laptops":
        #print(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.brand,Products.rating).filter(Categories.category_name=='laptop').all())
        products=dbqueryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.stock,Products.brand,Products.rating,func.count(Orders.order_id).label('order_count')).join(Categories,Products.category_id==Categories.category_id).outerjoin(Orders,Orders.product_id==Products.product_id).group_by(Products.product_id).filter(Categories.category_name=='laptop').all())
    elif category=="mobiles":
        products=dbqueryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.specs,Products.stock,Products.brand,Products.rating,func.count(Orders.order_id)).join(Categories,Products.category_id==Categories.category_id).outerjoin(Orders,Orders.product_id==Products.product_id).group_by(Products.product_id).filter(Categories.category_name=='mobiles').all())
    return {"products":products}

@app.route("/product/<int:product_id>")
def product_details(product_id):
    if Products.query.filter_by(product_id=product_id).first():
        return {"details":dbqueryconverter(db.session.query(Products.product_id,Products.product_name,Products.product_image,Products.price,Products.mrp,Products.stock,Products.specs,Products.brand,Products.rating,Sellers.seller_name,Categories.category_name).join(Sellers,Sellers.seller_id==Products.seller_id).join(Categories,Categories.category_id==Products.category_id).filter(Products.product_id==product_id).all())[0],"added":Carts.query.filter_by(user_id=current_user.user_id,product_id=product_id).count(),"wishlisted":Wishlists.query.filter_by(user_id=current_user.user_id,product_id=product_id).count()},200
    return {"message":"Not found"},404
    
@app.route("/dashboard/aboutuser")
def about_user():
    #print(singlequeryconverter(Users.query.filter_by(user_id=current_user.user_id).first()))
    if Users.query.filter_by(user_id=current_user.user_id).first().addr_id!=None:
        return dbqueryconverter(db.session.query(Users.user_name,Users.email_id,Addresses.line1,Addresses.line2,Addresses.city,Addresses.state,Addresses.pincode).join(Addresses).filter(Users.user_id==current_user.user_id).all())[0]
    else:
        return dbqueryconverter(db.session.query(Users.user_name,Users.email_id).filter(Users.user_id==current_user.user_id).all())[0]

@app.route("/cart")
def cart():
    return {"cart":dbqueryconverter(db.session.query(Products.product_name,Products.product_image,Products.price,Products.product_id,Products.specs,Products.brand,Products.stock,Products.mrp,Sellers.seller_name,Carts.quantity).join(Carts,Products.product_id==Carts.product_id).join(Sellers,Products.seller_id==Sellers.seller_id).filter(Carts.user_id==current_user.user_id).all())}

@app.route("/cart/add",methods=['GET','POST'])
def add_to_cart():
    response=request.get_json()
    product_id=response['product_id']
    if Carts.query.filter_by(user_id=current_user.user_id,product_id=product_id).first():
        cart=Carts.query.filter_by(user_id=current_user.user_id,product_id=product_id).first()
        cart.quantity+=1
        db.session.commit()
        return {"message":"Item incremented"}
    else:
        cart=Carts(current_user.user_id,product_id=product_id,quantity=1)
        db.session.add(cart)
        db.session.commit()
        return {"message":"Item added"}

@app.route("/cart/less/<string:amt>",methods=['GET','DELETE'])
def dec_to_cart(amt):
    response=request.get_json()
    product_id=response['product_id']
    if Carts.query.filter_by(user_id=current_user.user_id,product_id=product_id).first():
        cart=Carts.query.filter_by(user_id=current_user.user_id,product_id=product_id).first()
        if cart.quantity==1 or amt=="all":
            db.session.delete(cart)
            db.session.commit()
            return {"message":"Item decremented"}
        else:
            cart.quantity-=1
            db.session.commit()
            return {"message":"Item removed"}


@app.route("/orders")
def user_orders():
    return {"orders":dbqueryconverter(db.session.query(Orders.order_id,Orders.user_id,Orders.product_id,Orders.price,Orders.quantity,Orders.status,Orders.date_order,Orders.date_delivery,Products.product_name,Products.product_image,Products.specs,Addresses.line1,Addresses.line2,Addresses.city,Addresses.state,Addresses.pincode).join(Users,Users.user_id==Orders.user_id).join(Products,Products.product_id==Orders.product_id).join(Addresses,Addresses.addr_id==Orders.addr_id).filter(Users.user_id==current_user.user_id).order_by(Orders.date_order.desc(),Orders.order_id.desc()).all())}

@app.route("/order",methods=['GET','POST'])
def place_order():
    response=request.get_json()
    print('a',response)
    product_id=response['product_id']
    quantity=response['quantity']
    price=response['price']
    address_changed=response['address_changed']
    primary=response['primary']
    if primary:
        type='primary'
    else:
        type='temporary'
    addr_id=current_user.addr_id
    if address_changed==True:
        if not primary:
            addr=Addresses(line1=response['line1'],line2=response['line2'],city=response['city'],state=response['state'],pincode=response['pincode'],type=type)
            db.session.add(addr)
            db.session.commit()
            addr_id=addr.addr_id
        else:
            addr=Addresses.query.filter_by(addr_id=addr_id).first()
            addr.line1=response['line1']
            addr.line2=response['line2']
            addr.city=response['city']
            addr.state=response['state']
            addr.pincode=response['pincode']
            db.session.commit()
    if Products.query.filter_by(product_id=product_id).first().stock<quantity:
        return {"message":"Not enough stock"},400
    order=Orders(product_id=product_id,user_id=current_user.user_id,quantity=quantity,price=price,addr_id=addr_id)
    db.session.add(order)
    db.session.commit()
    product=Products.query.filter_by(product_id=product_id).first()
    product.stock-=quantity
    db.session.commit()
    return {"message":"Order placed"},200

@app.route("/wishlist")
def wishlist():
    return {"wishlist":dbqueryconverter(db.session.query(Wishlists.product_id,Products.product_name,Products.product_image,Products.specs,Products.stock,Products.price,Products.mrp,Sellers.seller_name).join(Products,Wishlists.product_id==Products.product_id).join(Sellers,Products.seller_id==Sellers.seller_id).filter(Wishlists.user_id==current_user.user_id).all())}

@app.route("/wishlist/add",methods=['GET','POST'])
def add_to_wishlist():
    response=request.get_json()
    product_id=response['product_id']
    if Wishlists.query.filter_by(user_id=current_user.user_id,product_id=product_id).first():
        return {"message":"Already in wishlist"},300
    wishlist=Wishlists(current_user.user_id,product_id=product_id)
    db.session.add(wishlist)
    db.session.commit()
    return {"message":"Item added"},200

@app.route("/wishlist/delete",methods=['GET','DELETE'])
def delete_from_wishlist():
    response=request.get_json()
    product_id=response['product_id']
    if Wishlists.query.filter_by(user_id=current_user.user_id,product_id=product_id).first():
        wishlist=Wishlists.query.filter_by(user_id=current_user.user_id,product_id=product_id).first()
        db.session.delete(wishlist)
        db.session.commit()
        return {"message":"Item removed"},200
    return {"message":"Not found"},404

@app.route("/image/<string:name>")
def send_image(name):
    return send_file("./uploads/"+name)


