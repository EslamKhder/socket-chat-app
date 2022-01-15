
var logInElement = document.querySelector('#login');
var chatElement = document.querySelector('#chat');
var userForm = document.querySelector('#userForm');
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
    stomp.send("/app/chat.logIn",{},
            JSON.stringify({sender: userName,chatType: 'JOIN'})
        )
    stomp.subscribe("/app/chat.send",sendMessage)
}
function sendMessage(){

}
userForm.addEventListener('submit',connectSocket)