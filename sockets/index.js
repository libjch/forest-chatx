'use strict';

module.exports = function(server,services){
    var io = require("socket.io")(server);
    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('login', function () {
            console.log('login event')
        });

        socket.on('message', function (message,callback) {
            console.log('message event '+JSON.stringify(message));
            socket.broadcast.emit(message);

            callback({
                status: 'OK'
            });

        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
        });

        socket.on('join', function(options,callback){
            console.log('join event: '+JSON.stringify(options));

            //TODO: check user information, password etc.

            var roomObject = services.rooms.addUserToRoom(options.room,options.username);

            console.log('Room object found: '+JSON.stringify(roomObject));

            callback({
                status: 'OK',
                users: roomObject.users,
                messages: []
            });
        });
    });
    return io;
};




