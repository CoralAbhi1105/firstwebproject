const socket = io();

let name1;
const form = document.getElementById('send-container');
let textarea = document.querySelector('#textarea');
const messageInput = document.getElementById('textarea')
let messageArea = document.querySelector('.message__area');

const append = (message)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    // messageElement.classList.add('');
    messageArea.append(messageElement);
}

do{
    name1 = prompt('Please enter your name: ')
} while(!name1)
socket.emit('New-user-joined', name1)

socket.on('User-joined', name1 =>{
    append(`${name1} joined the chat`)
})


textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

form.addEventListener('submit', (e)=>{
e.preventDefault();
sendMessage(textarea.value)
})

function sendMessage(message){
    let msg = {
        user: name1,
        message: message.trim()
    }
    // Append
    appendMessage(msg, 'outgoing')   
    textarea.value = '' 
    scrollToBottom()

    // Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

// Recieve Messages

socket.on('message', (msg) =>{
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
