'use strict';

var rooms = require("../services/roomService.js");

module.exports = function(server,services){
    var io = require("socket.io")(server);
    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('login', function () {
            console.log('login event')
        });

        socket.on('message', function (message) {
            console.log('message event');
            socket.broadcast.emit(message);
        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
        });

        socket.on('join', function(options){
            console.log('join event: '+JSON.stringify(options));

            var roomObject = services.rooms.getOrCreateRoom(options.room);

            console.log('Room object found: '+JSON.stringify(roomObject));

            return "ok";
        });
    });
    return io;
};




