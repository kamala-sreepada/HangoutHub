from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return jsonify({"message": "It's working!!!"})

if __name__ == '__main__':
    app.run(debug=True)
