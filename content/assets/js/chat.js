var socket = io();
userID = sessionStorage.getItem("user");
console.log(userID);
socket.emit('join', userID);
console.log('Hi')
$(function () {

    $('form').submit(function() {
        console.log('submitted')
        socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
    });

    socket.on('join', function(ID) {
        console.log('hello')
        $('#messages').append($('<li>').text(userID+" has joined"));
    });
    socket.on('chat message', function(userID, msg) {
        $('#messages').append($('<li>').text(userID+": "+msg));
    });

    socket.on('disconnect', function(userID) {
        $('#messages').append($('<li>').text(userID+" has left"));
    });
});