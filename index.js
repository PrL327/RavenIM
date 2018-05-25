var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Users = {};
// app.use(express.static(''))
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});
app.use(express.static('assets'));
io.on('connection',function(socket){
  socket.on("join", function(name){
 		Users[socket.id] = name;
 		socket.emit("update", "You have connected to the server.");
 		io.emit('update', name + " has joined the server.");
 		io.emit('update-people', Users);
    console.log(Users);
 	});
  socket.on('chat message', function(msg){
    io.emit('chat message', Users[socket.id], msg);
  });
  socket.on("disconnect", function(){
		io.emit('update', Users[socket.id] + " has left the server.");
		delete Users[socket.id];
		io.emit('update-people', Users);
	});
});
http.listen(3000, function(){
  console.log('listening on *: 3000');
});
