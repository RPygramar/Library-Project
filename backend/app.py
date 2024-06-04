from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS
import json
from bson import ObjectId, json_util
import jwt
from datetime import datetime, timedelta
import os
from functools import wraps

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'SEGREDO'

client = MongoClient("mongodb+srv://edkkr:rogerinhocabecadepedra123@library.uvcntye.mongodb.net/",
        tls=True,tlsAllowInvalidCertificates=True)

db = client["library"]


def parse_json(data):
    return json.loads(json_util.dumps(data))



@app.route('/books/target/<target>/order/<order>/page/<page>', methods=['GET'])
def get_books_sorted(target, order, page):
    books = list(db.books.find().sort(target, int(order)).skip((int(page) -1 )* 10).limit(10))
    total = db.books.count_documents({})  # Correctly get the total count of documents

    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/page/<page>', methods=['GET'])
def get_books_page(page):
    books = list(db.books.find().skip((int(page) -1 )* 10).limit(10))
    total = db.books.count_documents({})
    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/category/<category>/page/<page>', methods=['GET'])
def get_books_by_category(category, page):
    books = list(db.books.find({"categories": category}).skip((int(page) -1 )* 10).limit(10))
    total = db.books.count_documents( {"categories": category})

    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/author/<author>/page/<page>', methods=['GET'])
def get_books_by_author(author, page):
    books = list(db.books.find({"authors": author}).skip((int(page) -1 )* 10).limit(10))
    total = db.books.count_documents({"authors": author})
    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/category/<category>/author/<author>/page/<page>', methods=['GET'])
def get_books_by_category_and_author(category, author, page):
    books = list(db.books.find({"categories": category, "authors": author}).skip((int(page) -1 )* 10).limit(10))
    total = db.books.count_documents({"categories": category,
                                      "authors": author})
    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/category/<category>/author/<author>/target/<target>/order/<order>/page/<page>', methods=['GET'])
def get_books_by_category_and_author_order(category, author, target, order, page):
    books = list(db.books.find({"categories": category, "authors": author}).sort(target, int(order)).skip((int(page) -1) * 10).limit(10))
    total = db.books.count_documents({"categories": category,
                                      "authors": author})  # Correctly get the total count of documents matching both criteria

    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/category/<category>/target/<target>/order/<order>/page/<page>', methods=['GET'])
def get_books_by_category_order(category, target, order, page):
    books = list(db.books.find({"categories": category}).sort(target, int(order)).skip((int(page) -1) * 10).limit(10))
    total = db.books.count_documents({"categories": category})
    return jsonify({"books": parse_json(books), "total": total})

@app.route('/books/author/<author>/target/<target>/order/<order>/page/<page>', methods=['GET'])
def get_books_by_author_order(author, target, order, page):
    books = list(db.books.find({"authors": author}).sort(target, int(order)).skip((int(page) -1) * 10).limit(10))
    total = db.books.count_documents({"authors": author})
    return jsonify({"books": parse_json(books), "total": total})

@app.route("/books/title/<title>", methods=['GET'])
def get_books_by_title(title):
    books = list(db.books.find({"title": title}))
    return parse_json(books), 200

@app.route('/user/login', methods=['POST'])
def login():
    user = request.args.get('user')
    password = request.args.get('password')
    confirmation = db.users.find_one({"username": user, "password": password, "confirmed": True})

    if user is None or password is None:
        return jsonify({'message': 'User or password are missing'}), 401

    if confirmation:
        token = jwt.encode({
            'username': user,
            'exp': datetime.utcnow() + timedelta(minutes=5)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get('token')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, app.config["SECRET_KEY"],
                              algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'expirado': True}), 401

        return func(*args, **kwargs)
    return decorated

#Tornar mais dinamico o numero de livros por pagina
@app.route("/books", methods=["GET"])
def get_books():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    skip_value = (page - 1) * limit
    books = list(db.books.find().skip(skip_value).limit(limit))
    return parse_json(books)

@app.route("/books/<id>", methods=["GET"])
def get_book(id):
    book = db.books.find_one({"id": id})
    if book is None:
        return jsonify({"message": "Book not found"}), 404
    return parse_json(book), 200

#Esta com um erro
@app.route("/books", methods=["POST"])
@token_required
def create_book():
    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}), 400

    if len(data)>1:
        for book in data:
            db.books.insert_one(book)
        return jsonify({"message": "Books created"})

    db.books.insert_one(data[0])
    return jsonify({"message": "Book created"})



@app.route("/books/<id>", methods=["PUT"])
@token_required
def update_book(id):
    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}), 400
    try:
        object_id = ObjectId(id)
    except Exception as e:
        return jsonify({"message": "Invalid book ID format"}), 400
    update_result = db.books.update_one({"_id": object_id}, {"$set": data[0]})
    if update_result.matched_count == 0:
        return jsonify({"message": "Book not found"}), 404
    return jsonify({"message": "Book updated"}), 200


@app.route("/user/confirmation", methods=["POST"])
@token_required
def confirm_user():
    user = request.args.get('user')
    if not user:
        return jsonify({"message": "Specify the user"}), 400

    existing_user = db.users.find_one({"username": user})
    print(existing_user)
    if existing_user is not None and existing_user["confirmed"] != True:
        db.users.update_one({"username": user},{"$set": {"confirmed": True}})
        return jsonify({"message": "User confirmed"}), 200
    elif existing_user is not None and existing_user["confirmed"] == True:
        return jsonify({"message": "User already has permissions"}), 400

    return jsonify({"message": "User doesnt exist"}), 400



@app.route("/user/signup", methods=["POST"])
def signup():
    user = request.args.get('username')
    password = request.args.get('password')
    confirmed = False
    if not user or not password:
        return jsonify({"message": "Username and Password are required"}), 400

    existing_user = db.users.find_one({"username": user})

    if existing_user is None:
        db.users.insert_one({"username": user, "password": password, "confirmed": confirmed})
        return jsonify({"message": "User created"}), 200
    return jsonify({"message": "User already exists"}), 400



@app.route("/books/<id>", methods=["DELETE"])
@token_required
def delete_book(id):
    book = db.books.find_one({"_id": ObjectId(id)})
    if book is None:
        return jsonify({"message": "Book not found"}), 404
    db.books.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Book deleted"})



@app.route("/books/featured", methods=["GET"])
def get_featured():
    featured = db.books.find({"score": 5 }).sort("price", -1).limit(5)
    return parse_json(featured)

@app.route("/books/total", methods=["GET"])
def get_total_books():
    total = db.books.count_documents({})
    return jsonify({"total": total})

@app.route("/books/autor/<autor>", methods=["GET"])
def get_books_by_autor(autor):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip_value = (page - 1) * limit
    books = list(db.books.find({"authors": autor}).skip(skip_value).limit(limit))
    if len(books) == 0:
        return jsonify({"message": "Books not found"}), 404
    return parse_json(books)


@app.route("/books/ano/<int:ano>", methods=["GET"])
def get_books_by_ano(ano):
    initial_data = datetime(ano, 1, 1)
    final_data = datetime(ano, 12, 31)
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip_value = (page - 1) * limit
    books = db.books.find({"publishedDate": {"$gte": initial_data, "$lte": final_data}}).skip(skip_value).limit(limit)
    if len(books) == 0:
        return jsonify({"message": "Books not found"}), 404
    return parse_json(books)

@app.route("/books/categorias/<categoria>", methods=["GET"])
def get_books_by_categories(categoria):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip_value = (page - 1) * limit
    books = list(db.books.find({"categories": categoria}).skip(skip_value).limit(limit))
    if len(books) == 0:
        return jsonify({"message": "Books not found"}), 404
    return parse_json(books)

@app.route("/books/price", methods=["GET"])
def get_books_by_price():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    order = request.args.get("order", 1)

    mininum_price = float(request.args.get("min", 0))
    maximum_price = float(request.args.get("max", 200))

    skip_value = (page - 1) * limit
    books = list(db.books.find({"price":{"$gt": mininum_price, "$lte": maximum_price}}).sort("price", int(order)).skip(skip_value).limit(limit))
    if len(books) == 0:
        return jsonify({"message": "Books not found"}), 404
    return parse_json(books)


@app.route("/books/cart", methods=["POST"])
def cart():
    data = request.json
    if not data:
        return jsonify({"message": "No data provided"}), 400
    price = 0
    for book in data:
        price += book["price"]
    cart = {"cart": [data], "price":price}
    db.cart.insert_one(cart)
    return jsonify({"message": "Books added to cart"})


@app.route("/books/cart/<cart>/<price>", methods=["POST"])
def cart_checkout(cart, price):
    if not cart:
        return jsonify({"message": "No data provided"}), 400
    cart = {"cart": [cart], "price":price}
    db.cart.insert_one(cart)
    return jsonify({"message": "Books added to cart"})