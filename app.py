from flask import Flask
from flask_cors import CORS
from backend.flask_app import create_app
import os

# Create the Flask application using the factory function
app = create_app()

# Enable CORS for all routes with proper configuration
# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set a secret key for session management
# app.config['SECRET_KEY'] = 'your-secret-key-here'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000)) 
    app.run(host='0.0.0.0', port=port, debug=True)
    # app.run(debug=True, port=5000)