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
            console.log('message event'));
            authenticator.authenticatedRequest(data,function (err) {
                if(err){
                   callback({
                       status:'KO',
                       error: err
                   })
                }else{
                    services.rooms.addMessageFromUserToRoom(data.message,data.username,data.room);
                    socket.broadcast.to(data.room).emit('message', {message: data.message,room: data.room,username: data.username});
                    callback({
                        status: 'OK'
                    });
                }
            });
        });

        socket.on('disconnect', function(){
            console.log('disconnect event');
            var username = usernamesPerSockets[socket.id];
            if(username){
                console.log("Removing "+username+" "+socket);
                services.rooms.removeUser(username,function (rooms) {
                    for(let room of rooms){
                        socket.broadcast.to(room).emit('left',username);
                    }
                    delete usernamesPerSockets[socket.id];
                });
            }
        });

        socket.on('leave', function (data) {
            console.log('leave event');
            services.rooms.removeUserFromRoom(data.username,data.room);
            socket.broadcast.to(data.room).emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            authenticator.authenticatedRequest(data,function (err) {
                if(err){
                    callback({
                        status:'KO',
                        error: err
                    })
                }else {
                    //User is registered
                    services.rooms.addUserToRoom(data.username, data.room,function (room) {
                        //add to client list to handle disconnect
                        usernamesPerSockets[socket.id] = data.username;
                        //Join the room-channel on socketio
                        socket.join(room.name);
                        socket.broadcast.to(room.name).emit('joined', data.username);
                        callback({
                            status: 'OK',
                            users: room.users,
                            messages: room.messages
                        });

                    });
                }
            });
        });
    });
    return io;
};




