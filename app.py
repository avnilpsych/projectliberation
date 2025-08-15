from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Chat server is running."

# Event when a user sends a message
@socketio.on('send_message')
def handle_message(data):
    print(f"Message from {data['username']}: {data['message']}")
    # Broadcast message to all connected clients
    emit('receive_message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
