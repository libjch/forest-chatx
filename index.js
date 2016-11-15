
var express = require('express');

var path = require('path');
var port = process.env.PORT || 3000;

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var index = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// serve static files
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);

//avoid favicon error


http.listen(port, function(){
  console.log('listening on *:'+port);
});

io.on('connection', function(socket){
    console.log('a user connected');
});
