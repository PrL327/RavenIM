$(function () {
    var socket = io();
    // $("#chat").hide();
    // $('#messages').hide();
	// $("#name").focus();
    $('form').submit(function(){
        socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
    });
    socket.on('chat message', function(userID, msg){
        $('#messages').append($('<li>').text(userID+": "+msg));
    });
    $("#join").click(function(){
        var userID = $("#name").val();
        if (userID != "") {
            socket.emit("join", userID);
            // $("#login").detach();
            // $("#chat").show();
            // $("#msg").focus();
            // $('#messages').show();
            ready = true;
            socket.emit('chat message', userID+' has joined the room');
        }
    });
    $("#name").keypress(function(e){
        if(e.which == 13) {
            var userID = $("#name").val();
            if (userID != "") {
            socket.emit("join", userID);
            ready = true;
            // $("#login").detach();
            // $("#chat").show();
            // $("#msg").focus();
            // $('#messages').show();
            socket.emit('chat message', userID+' has joined the room');
            }
        }
    });
  });