$(function() {
    var messagesList = $("#messages");
    var userList = $("#users");

    function displayMyself(username){
        var myself = $("#logged-username");
        $("<p class='myself'>Hello! You are logged as "+username+"</p>").appendTo(myself);
    }

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
        userList.empty();
        for(let user of users){
            addUser(user)
        }
    }

    function addMessage(message){
        $("<li><span class='username'>"+message.username+": </span><span class='content'>"+message.message+"</span></li>").appendTo(messagesList);
    }

    function addUser(username){
        $("<li id='user-"+username+"'>"+username+"</li>").appendTo(userList);
        $("<li><span class='event'>"+username+" has joined</span>").appendTo(messagesList);
    }
    function removeUser(username){
        $("#user-"+username).remove();
        $("<li><span class='event'>"+username+" has left</span>").appendTo(messagesList);
    }

    var socket = io();

    //Socket.io event hooks:
    socket.on('message', function (data) {
        addMessage(data);
    });
    socket.on('joined', function (data) {
        addUser(data);
    });
    socket.on('left', function (data) {
        removeUser(data);
    });

    /*var username = Cookies.get("username");
    if (username != 'undefined') {
        displayLogin();
        console.log("No Session found");
    } else {
        displayChat();
        console.log("Session found: " + username);
    }*/
    displayLogin();


    //Add button hooks:
    //Send Message button
    $("#send").click(function () {
        const message = {
            username: $("#username").val(),
            message: $("#message").val(),
            room: $("#room").val()
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
                displayUsers(data.users);
                displayMyself(options.username);
            }
        });
    });
});

