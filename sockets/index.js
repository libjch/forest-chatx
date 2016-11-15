'use strict';

module.exports = function(server,services){
    var io = require("socket.io")(server);

    var clients = {};

    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('message', function (message,callback) {
            console.log('message event '+JSON.stringify(message));
            socket.broadcast.to(message.room).emit('message', message);
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
            }
        });

        socket.on('leave', function (data) {
            services.rooms.removeUserFromRoom(data.room,data.username);
            socket.broadcast.to(data.room).emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            console.log('join event: '+JSON.stringify(data));

            var user = services.username.getOrCreateUser(data.username,data.password);
            if(user.error){
                callback({
                    status: 'KO',
                    error: user.error
                })
            }else{
                //User is registered

                var roomObject = services.rooms.addUserToRoom(data.username,data.room);

                //add to client list to handle broadcast
                clients[socket.id] = data.username;

                socket.join(roomObject.name);

                socket.broadcast.to(roomObject.name).emit('joined', data.username);

                callback({
                    status: 'OK',
                    users: roomObject.users,
                    messages: []
                });
            }
        });
    });
    return io;
};




