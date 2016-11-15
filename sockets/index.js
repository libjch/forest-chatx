'use strict';

module.exports = function(server,services){
    var io = require("socket.io")(server);

    var clients = {};

    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('login', function () {
            console.log('login event')
        });

        socket.on('message', function (message,callback) {
            console.log('message event '+JSON.stringify(message));
            socket.broadcast.emit('message', message);
            callback({
                status: 'OK'
            });
        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
            var username = clients[socket.id];

            if(username){
                console.log("Removing "+username+" "+socket);
                services.rooms.removeUser(username);
                socket.broadcast.emit('left',username);
            }
        });

        socket.on('leave', function (data) {
            services.rooms.removeUserFromRoom(data.room,data.username);
            socket.broadcast.emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            console.log('join event: '+JSON.stringify(data));

            //TODO: check user information, password etc.

            var roomObject = services.rooms.addUserToRoom(data.username,data.room);

            console.log('Room object found: '+JSON.stringify(roomObject));

            //add to client list to handle broadcast
            clients[socket.id] = data.username;

            socket.broadcast.emit('joined', data.username);

            callback({
                status: 'OK',
                users: roomObject.users,
                messages: []
            });
        });
    });
    return io;
};




