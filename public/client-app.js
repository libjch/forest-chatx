$(function() {
    console.log("Start here!");

    var socket = io();
    socket.on('connection', function (socket) {
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

    var username = Cookies.get("username");
    if (username != 'undefined') {
        $(".login").removeClass("hidden");
        console.log("No Session found");
    } else {
        $(".chat").removeClass("hidden");
        console.log("Session found: " + username);
    }


    $("#start").click(function () {
        var options = {
            room: $("#room").val(),
            username: $("#username").val()
        };
        console.log(options);
        socket.emit("join",options);
    });
});

