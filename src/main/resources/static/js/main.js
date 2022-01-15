
var logInElement = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
var connect = document.querySelector('#connect');
var mainChat = document.querySelector('#main-chat');
var sendDiv = document.querySelector('#sendDiv');
var userName = null;
var stomp = null;
var URL = "http://localhost:8080"
function connectSocket(event){
    userName = document.querySelector('#username').value.trim(); // null    value
    if(userName){
        logInElement.classList.add("dis");
        chatElement.classList.remove("dis");
        var socket = new SockJS(URL + '/connect');
        stomp = Stomp.over(socket);
        stomp.connect({},connectedDone)
    }
    event.preventDefault()
}
function connectedDone(){
    stomp.subscribe("/topic/all",sendMessage)
    stomp.send("/app/chat.logIn",{},
            JSON.stringify({sender: userName,chatType: 'JOIN'})
        )

    connect.classList.add('dis')
}
function sendMessage(payload){
    var message = JSON.parse(payload.body)
    if(message.chatType == 'JOIN'){
        joinUser(message,"join")
    } else if (message.chatType == 'LEAVE'){
        joinUser(message,"leave")
    } else {
        console.log("*********************** Chat")
    }
}
function joinUser(message,state){
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var hr1 = document.createElement('hr');
    var hr2 = document.createElement('hr');
    var messageJoin = document.createTextNode(message.sender + " " + state)
    li1.classList.add('status');
    li1.appendChild(messageJoin)
    li2.appendChild(hr1)
    li2.appendChild(li1)
    li2.appendChild(hr2)
    mainChat.appendChild(li2)
}
function send(){
    var messageUser = document.querySelector('#sms').value.trim()     //
    if(messageUser && stomp){
        var userMessage ={
            message: messageUser,
            chatType:'CHAT',
            sender: userName
        }
        stomp.send("/app/chat.send",{},JSON.stringify(userMessage))
        document.querySelector('#sms').value = '';
    }
}
userForm.addEventListener('submit',connectSocket)
sendDiv.addEventListener('click',send)