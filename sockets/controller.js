'use strict';

/**
 * Socket.io controller, handle events and dispatch to services
 */
module.exports = function(server,services){

    var io = require("socket.io")(server);
    var authenticator = require("./authenticator")(services);

    var clients = {}; //Dictionary of known connected users to avoid old-client disconnect events

    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('message', function (data,callback) {
            console.log('message event '+JSON.stringify(data));
            if(!authenticator.authenticatedRequest(data,callback)) {
                return;
            }
            socket.broadcast.to(data.room).emit('message', data);
            callback({
                status: 'OK'
            });
        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
            var username = clients[socket.id];
            if(username){
                console.log("Removing "+username+" "+socket);
                var rooms = services.rooms.removeUser(username);
                for(let room of rooms){
                    socket.broadcast.to(room).emit('left',username);
                }
                delete clients[socket.id];
            }
        });

        socket.on('leave', function (data) {
            console.log('leave event: '+JSON.stringify(data));
            services.rooms.removeUserFromRoom(data.room,data.username);
            socket.broadcast.to(data.room).emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            console.log('join event: '+JSON.stringify(data));
            if(!authenticator.authenticatedRequest(data,callback)) {
                return;
            }
            //User is registered
            var roomObject = services.rooms.addUserToRoom(data.username,data.room);

            //add to client list to handle disconnect
            clients[socket.id] = data.username;

            //Join the room-channel on socketio
            socket.join(roomObject.name);
            socket.broadcast.to(roomObject.name).emit('joined', data.username);

            callback({
                status: 'OK',
                users: roomObject.users,
                messages: []
            });
        });
    });
    return io;
};




