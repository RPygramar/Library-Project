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



@app.route('/user/login', methods=['POST'])
def login():
    # Fazer Login do user
    user = request.args.get('user')
    password = request.args.get('password')
    # Check se user é válido e se tem o campo confirmation = True
    print(user, password)
    confirmation = db.users.find_one({"username": user, "password": password})
    print(confirmation)
    if confirmation:
        token = jwt.encode({
            'username': user,
            'exp': datetime.utcnow() + timedelta(minutes=1)
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
    book = db.books.find_one({"_id": ObjectId(id)})
    return parse_json(book)

#Esta com um erro
# @app.route("/books", methods=["POST"])
# @token_required
# def create_book():
#      data = request.json
#      print(data[0])
#      if len(data) == 1:
#         db.books.insert_one(data)
#         return jsonify({"message": "Book created"})
#      elif len(data) > 1:
#         db.books.insert_many(data[0])
#         return jsonify({"message": "Books created"})
#      return jsonify({"message": "No data provided"})




@app.route("/books/features", methods=["GET"])
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

    return parse_json(books)


@app.route("/books/ano/<int:ano>", methods=["GET"])
def get_books_by_ano(ano):
    initial_data = datetime(ano, 1, 1)
    final_data = datetime(ano, 12, 31)
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip_value = (page - 1) * limit

    books = db.books.find({"publishedDate": {"$gte": initial_data, "$lt": final_data}}).skip(skip_value).limit(limit)

    return parse_json(books)

@app.route("/books/categorias/<categoria>", methods=["GET"])
def get_categorias(categoria):
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    skip_value = (page - 1) * limit
    books = list(db.books.find({"categories": categoria}).skip(skip_value).limit(limit))

    return parse_json(books)

@app.route("/books/price", methods=["GET"])
def get_books_by_price():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))

    mininum_price = float(request.args.get("min", 0))
    maximum_price = float(request.args.get("max", 200))

    skip_value = (page - 1) * limit
    books = list(db.books.find().sort({"price":{"$gt": mininum_price, "$lte": maximum_price}}).sort("price", -1).skip(skip_value).limit(limit))

    return parse_json(books)


