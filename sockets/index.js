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

            //var allowed = services.users.checkUserInformations(options);

            var roomObject = services.rooms.addUserToRoom(options.room,options.username);

            console.log('Room object found: '+JSON.stringify(roomObject));

            return {
                status: 'OK',
                users: roomObject.users

            };
        });
    });
    return io;
};




