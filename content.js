const coderclass = "py-4 px-3 coding_desc_container__gdB9M";

let lastvisitedpage = "";
let conversationHistory = []; // Store conversation history

function isPAgechange() {
    const currentPAth = window.location.pathname;
    if (lastvisitedpage == currentPAth)
        return false;
    lastvisitedpage = currentPAth;
    return true;
}

function isproblemsroute() {
    const pathname = window.location.pathname;
    return pathname.indexOf('/problems/') == 0 && pathname.length > "/problems/".length;
}

function observePAgechange() {
    if (!isPAgechange()) {
        console.log("no page change");
        return;
    };
    console.log("page change");
    if (isproblemsroute()) {
        addAIhelpbutton();
        createChatBox();
        console.log("we are on problems route");
    }
}

setInterval(observePAgechange, 500);

document.addEventListener("DOMContentLoaded", () => {
    createChatBox();
});

function createChatBox() {
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');

    const chatBox = document.createElement('div');
    chatBox.classList.add('chat-box');
    chatBox.id = 'chat-box'; // Set an ID for easy access later

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'user-input';
    inputField.classList.add('chat-input');
    inputField.placeholder = 'Type a message...';

    const sendButton = document.createElement('button');
    sendButton.classList.add('send-button');
    sendButton.textContent = 'Send';
    sendButton.onclick = () => sendMessage(inputField);

    chatContainer.appendChild(chatBox);
    chatContainer.appendChild(inputField);
    chatContainer.appendChild(sendButton);

    document.body.appendChild(chatContainer);

    const box = document.getElementsByClassName(coderclass)[0];
    box.insertAdjacentElement("beforeend", chatContainer);
}

function sendMessage(inputField) {
    const userMessage = inputField.value.trim();

    if (userMessage === "") return; // Don't send empty messages

    // Add user message to conversation history
    conversationHistory.push({ sender: 'user', text: userMessage });

    // Display user message
    displayMessage(userMessage, 'user-message');

    // Clear the input field
    inputField.value = '';

    // Simulate bot response (delay for better user experience)
    setTimeout(() => {
        getAiResponse();
    }, 1000);
}

// Function to fetch content using the API
async function getAiResponse() {
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCyinshJiYNJkChiSRNOxluX0hLHmtiDQA";

    // Build the message content from conversation history
    const requestData = {
        contents: [{
            parts: conversationHistory.map(msg => ({ text: msg.text }))
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });

        // Parse the JSON response
        const data = await response.json();

        // Extract the AI response
        const aiText = data.candidates[0].content.parts[0].text;

        // Add AI response to conversation history
        conversationHistory.push({ sender: 'bot', text: aiText });

        // Display AI response
        displayMessage(aiText, 'bot-message');
    } catch (error) {
        console.error("Error fetching AI response:", error);
    }
}

// Function to display a message in the chat box
function displayMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addAIhelpbutton() {
    // Create the AI Help button
    const button = document.createElement('button');
    button.innerText = 'AI Help';

    button.style.padding = '10px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';

    // Append the button to the body
    document.body.appendChild(button);

    const container = document.getElementsByClassName(coderclass)[0];
    container.insertAdjacentElement("beforeend", button);

    // Add an event listener for the button click
    button.addEventListener('click', function () {
        console.log(getlocalstorage(getcurrenProbID()));
        alert(getcurrenProbID());
    });
}

function getcurrenProbID() {
    const idmatch = window.location.pathname.match(/-(\d+)$/);
    return idmatch ? idmatch[1] : null;
}

function getlocalstorage(id) {
    const key = `course_21400_${id}_C++14`;
    const value = localStorage.getItem(key);

    if (value !== null)
        console.log(`value for key "${key}":`, value);
    else console.log(`key "${key}" not found in localstorage.`);

    return value;
}
