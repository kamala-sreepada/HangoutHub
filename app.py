from flask import Flask
from flask_cors import CORS
from backend.flask_app import create_app

# Create the Flask application using the factory function
app = create_app()

# Enable CORS for all routes with proper configuration
# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set a secret key for session management
# app.config['SECRET_KEY'] = 'your-secret-key-here'

if __name__ == '__main__':
    app.run(debug=True, port=5000)