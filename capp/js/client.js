const socket= io('http://localhost:8000');
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")


const append=(message,position)=>
{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messageContainer.append(messageElement);


}

form.addEventListener('submit',(e)=>
{
   e.preventDefault();
   const message=messageInput.value;
   append(`You: ${message}`,'right')   //r
   socket.emit('send',message);
   messageInput.value='';
})

const name1=prompt("enter your name to join");
socket.emit('new-user-joined',name1);

socket.on('user-joined',name1=>
{
   append(`${name1} has joined the chat`,'right')  //r
})

socket.on('receive',data=>
{
   append(`${data.name1}:${data.message}`,'left')   //l
})

socket.on('leave',name1=>
{
   append(`${data.name1} left the chat`,'left')  //l
})