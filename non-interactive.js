  const coderclass="py-4 px-3 coding_desc_container__gdB9M";

  let lastvisitedpage="";
  function isPAgechange(){

    const currentPAth=window.location.pathname;
    if(lastvisitedpage==currentPAth)
        return false;
    lastvisitedpage=currentPAth;
    return true;
  
}

  function isproblemsroute(){
    const pathname = window.location.pathname;
    return pathname.indexOf('/problems/')==0 && pathname.length > "/problems/".length;

  }

   function observePAgechange(){
    
    if(!isPAgechange()){
        console.log("no page change");
        return;
    };
    console.log("page change");
    if(isproblemsroute()){addAIhelpbutton();
        createChatBox();
     console.log("we are on problems route");
    }
   }

  setInterval(observePAgechange,500);

  document.addEventListener("DOMContentLoaded", () => {
    createChatBox();
});

function createChatBox() {
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.classList.add('chat-container');
    
    // Create chat box
    const chatBox = document.createElement('div');
    chatBox.classList.add('chat-box');
    chatBox.id = 'chat-box'; // Set an ID for easy access later
    
    // Create chat input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'user-input';
    inputField.classList.add('chat-input');
    inputField.placeholder = 'Type a message...';

    // Create send button
    const sendButton = document.createElement('button');
    sendButton.classList.add('send-button');
    sendButton.textContent = 'Send';
    sendButton.onclick = () => sendMessage(inputField);

    // Append elements to chat container
    chatContainer.appendChild(chatBox);
    chatContainer.appendChild(inputField);
    chatContainer.appendChild(sendButton);

    // Append chat container to the body of the document
    document.body.appendChild(chatContainer);
    
    const box=document.getElementsByClassName(coderclass)[0];
    box.insertAdjacentElement("beforeend",chatContainer);
}

 function sendMessage(inputField) {
    const userMessage = inputField.value.trim();

    if (userMessage === "") return; // Don't send empty messages

    // Display user message
    displayMessage(userMessage, 'user-message');
    
    // Clear the input field
    inputField.value = '';
    // const aiResponse = await getAiResponse(userMessage);

    // Simulate bot response
    setTimeout(() => {
      // displayMessage("Bot: " + aiResponse,'bot-message');
       getAiResponse(userMessage);
    //    displayMessage("Bot: " + getBotResponse(userMessage), 'bot-message');
    }, 1000);
}


function displayMessage(message, className) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotResponse(userMessage) {
    const responses = {
        "hello": "Hi there! How can I help you?",
        "how are you": "I'm just a bot, but I'm doing great!",
        "bye": "Goodbye! Have a nice day!",
    };
    return responses[userMessage.toLowerCase()] || "Navneet , i am fine !!";
}
// Function to fetch content using the API

async function getAiResponse(pucha) {
  const url = "hardocodedAPI";
  
  // Define the data to send in the POST request
  const requestData = {
      contents: [{
          parts: [{ text : pucha }]
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

      // Extract the text from the API response
      const aiText = data.candidates[0].content.parts[0].text;
      
      // Display the AI's response
      // console.log(aiText);
      displayMessage(aiText);  // Call a function to show the text in your chat
  } catch (error) {
      console.error("Error fetching AI response:", error);
  }
}

// Function to display AI's response in the chat
// function displayAiText(text) {
//   const chatBox = document.getElementById('chatBox');
//   const message = document.createElement('div');
//   message.classList.add('message', 'ai-message');
//   message.innerText = text;
//   chatBox.appendChild(message);
//   chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
// }

// Trigger the function to get the response (e.g., when sending a message)
//   function addchatbox(){  
//    const chatbox=document.createElement('chatbox');
//     document.button.appendChild(chatbox);
//     const box=document.getElementsByClassName(coderclass)[0];
//      box.insertAdjacentElement("beforeend",button);
//   }

  function addAIhelpbutton(){
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
  
    const container=document.getElementsByClassName(coderclass)[0];
    container.insertAdjacentElement("beforeend",button);
    // Add an event listener for the button click
    button.addEventListener('click', function(){
      console.log(getlocalstorage(getcurrenProbID()));
      alert(getcurrenProbID());
    });
  
}

function getcurrenProbID()
{
  const idmatch=window.location.pathname.match(/-(\d+)$/);
return idmatch ? idmatch[1]:null;

}

function getlocalstorage(id)
{
    const key=`course_21400_${id}_C++14`;
    const value=localStorage.getItem(key);

    if(value!==null)
        console.log(`value for key "${key}":`,value);

    else console.log(`key "${key}" not found in localstorage.`);

    return value;
}
