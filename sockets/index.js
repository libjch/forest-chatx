'use strict';



module.exports = function(server,services){

    function authenticatedRequest(request,callback){
        var user = services.users.getOrCreateUser(request.username,request.password);
        if(user.error){
            callback({
                status: 'KO',
                error: user.error
            })
            return false;
        }
        return true;
    }

    var io = require("socket.io")(server);

    var clients = {};

    io.on('connection', function(socket){
        console.log('connection event');

        socket.on('message', function (data,callback) {
            console.log('message event '+JSON.stringify(data));
            if(!authenticatedRequest(data,callback)) {
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
            }
        });

        socket.on('leave', function (data) {
            services.rooms.removeUserFromRoom(data.room,data.username);
            socket.broadcast.to(data.room).emit('left',data.username);
        });

        socket.on('join', function(data,callback){
            console.log('join event: '+JSON.stringify(data));

            if(!data.username || !data.password || data.username.length < 1 || data.password.length < 1){
                callback({
                    status: 'KO',
                    error: 'Invalid username/password format'
                })
                return;
            }

            if(!authenticatedRequest(data,callback)) {
                return;
            }
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
        });
    });
    return io;
};




