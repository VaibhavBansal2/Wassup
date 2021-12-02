const socket = io()
let Name;
let textarea = document.querySelector('#textarea');
let chatarea = document.querySelector('.chat-area');
do {
    Name = prompt('Please enter your name: ')
} while (!Name)
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter')
        sendMessage(e.target.value)
})
function sendMessage(Message) {
    let msg = {
        user: Name,
        message: Message.trim()
    }
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom();
    socket.emit('Message', msg)
}
function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    chatarea.appendChild(mainDiv)
}
socket.on('Message', (msg => {
    appendMessage(msg, 'incoming')
}))
function scrollToBottom() {
    chatarea.scrollTop = chatarea.scrollHeight
}