let username = "";
const socket = io("http://localhost:5000"); // Connect to backend

function enterChat() {
    const nameInput = document.getElementById("username").value.trim();
    if (nameInput === "") {
        alert("Please enter your name!");
        return;
    }
    username = nameInput;

    document.getElementById("nameScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");
}

// Send message to server
function sendMessage() {
    const messageBox = document.getElementById("messageInput");
    const message = messageBox.value.trim();
    if (message === "") return;

    socket.emit('send_message', { username, message });
    messageBox.value = "";
}

// Receive message from server
socket.on('receive_message', (data) => {
    if (data.username === username) {
        // Add to right panel
        const sentMessages = document.getElementById("sentMessages");
        const msgElem = document.createElement("div");
        msgElem.textContent = `${data.username}: ${data.message}`;
        sentMessages.appendChild(msgElem);
    } else {
        // Add to left panel
        const incomingMessages = document.getElementById("incomingMessages");
        const msgElem = document.createElement("div");
        msgElem.textContent = `${data.username}: ${data.message}`;
        incomingMessages.appendChild(msgElem);
    }
});
