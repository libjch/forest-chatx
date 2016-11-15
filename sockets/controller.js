'use strict';

/**
 * Socket.io controller, handle events and dispatch to services
 */
module.exports = function(server,services){

    var io = require("socket.io")(server);
    var authenticator = require("./authenticator")(services);

    var usernamesPerSockets = {}; //Dictionary of known connected username, to close socket if case of duplicate connections

    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('message', function (data,callback) {
            console.log('message event '+JSON.stringify(data));
            if(!authenticator.authenticatedRequest(data,callback)) {
                return;
            }

            services.rooms.addMessageFromUserToRoom(data.message,data.username,data.room);

            socket.broadcast.to(data.room).emit('message', data);
            callback({
                status: 'OK'
            });
        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
            var username = usernamesPerSockets[socket.id];
            if(username){
                console.log("Removing "+username+" "+socket);
                var rooms = services.rooms.removeUser(username);
                for(let room of rooms){
                    socket.broadcast.to(room).emit('left',username);
                }
                delete usernamesPerSockets[socket.id];
            }
        });

        socket.on('leave', function (data) {
            console.log('leave event: '+JSON.stringify(data));
            services.rooms.removeUserFromRoom(data.username,data.room);
            socket.broadcast.to(data.room).emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            //console.log('join event: '+JSON.stringify(data));
            if(!authenticator.authenticatedRequest(data,callback)) {
                return;
            }
            //User is registered
            var room = services.rooms.addUserToRoom(data.username,data.room);

            //add to client list to handle disconnect
            usernamesPerSockets[socket.id] = data.username;

            //Join the room-channel on socketio
            socket.join(room.name);
            socket.broadcast.to(room.name).emit('joined', data.username);

            callback({
                status: 'OK',
                users: room.users,
                messages: room.getLastMessages(10)
            });
        });
    });
    return io;
};




