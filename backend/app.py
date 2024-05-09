from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import os
app = Flask(__name__)
CORS(app)
client = MongoClient("mongodb+srv://edkkr:rogerinhocabecadepedra123@library.uvcntye.mongodb.net/",
        tls=True,tlsAllowInvalidCertificates=True)

db = client["library"]
@app.route("/books", methods=["GET"])
def get_books():
    livros = db.teste.find_one({"nome":"teste"})
    return jsonify(livros)