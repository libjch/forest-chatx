
var express = require('express');

var path = require('path');
var port = process.env.PORT || 3000;

var app = express();
var http = require('http').Server(app);

var services = require('./services/serviceLayer')();
var index = require('./routes/index')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// launch socket.io server
var io = require("./sockets/controller")(http,services);


http.listen(port, function(){
  console.log('listening on *:'+port);
});
