/**
 * Created by libjch on 15/11/16.
 */

var io = io();


io.on('connection', function (socket) {
    var logged = false;
    var username;
    var room;

    socket.on('login', function (data) {
        console.log('LOGIN EVENT');
    });

    socket.on('message', function (data) {
        console.log('MESSAGE EVENT');
    });
});


