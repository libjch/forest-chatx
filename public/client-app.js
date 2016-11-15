$(function() {

    function displayChat(){
        console.log("Display chat");
        $(".chat").removeClass("hidden");
        $(".login").addClass("hidden");
    }

    function displayLogin(){
        console.log("Display login");
        $(".login").removeClass("hidden");
        $(".chat").addClass("hidden");
    }

    function displayUsers(users) {
        var list = $("#users");

        list.empty();
        for(let user of users){
            console.log(user);
            $("<li>"+user+"</li>").appendTo(list);
        }
    }


    console.log("Start here!");

    var socket = io();
    socket.on('connection', function (socket) {
        socket.on('login', function (data) {
            console.log('LOGIN EVENT');
        });

        socket.on('message', function (data) {
            console.log('MESSAGE EVENT');
        });
    });

    var username = Cookies.get("username");
    if (username != 'undefined') {
        displayLogin();
        console.log("No Session found");
    } else {
        displayChat();
        console.log("Session found: " + username);
    }


    $("#start").click(function () {
        var options = {
            room: $("#room").val(),
            username: $("#username").val()
        };

        console.log('Sending join');
        socket.emit("join",options,function(data){
            console.log('join result: '+JSON.stringify(data));
            if(data && data["status"] == 'OK'){
                displayChat();
                displayUsers(data["users"]);
            }
        });



    });
});

