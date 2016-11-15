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

    function addMessage(message){
        var messagesBox = $("#messages");
        $("<li><span class='username'>"+message.username+": </span><span class='content'>"+message.message+"</span></li>").appendTo(messagesBox);
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


    //Send Message button
    $("#send").click(function () {
        const message = {
            username: $("#username").val(),
            message: $("#message").val()
        };

        socket.emit("message",message,function(data){
            console.log('message result: '+JSON.stringify(data)+' '+JSON.stringify(message));
            if(data && data["status"] == 'OK'){
                addMessage(message);
            }
        });
    });


    //Join button
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

