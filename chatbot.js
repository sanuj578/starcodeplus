document.getElementById('send-btn').addEventListener('click', function() {
    const userMessage = document.getElementById('chat-input').value;
    if (userMessage.trim() === '') return;

    // Display user message
    addMessageToChat('You', userMessage);

    // Clear the input field
    document.getElementById('chat-input').value = '';

    // Simulate a response from the chatbot
    setTimeout(() => {
        const botResponse = generateChatbotResponse(userMessage);
        addMessageToChat('SCP', botResponse);
    }, 1000);
});

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateChatbotResponse(message) {
    // Here you can define basic responses based on user input
    if (message.toLowerCase().includes('hello')) {
        return 'Welcome to Star code plus ';
    } else if (message.toLowerCase().includes('Hii')) {
        return 'Sure, I am here to help! What do you need assistance with?';
    } else if (message.toLowerCase().includes('help')) {
        return 'Sure, I am here to help! What do you need assistance with?';
    } else if (message.toLowerCase().includes('sanuj')) {
        return 'Sure, I am here to help! What do you need assistance with?';
    
    } else {
        return 'WELCOME TO STAR CODE PLUS ';
    }
}
