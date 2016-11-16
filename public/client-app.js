$(function() {
    "use strict";

    var messagesList = $("#messages");
    var userList = $("#users");

    //Usefull jQuery display/hide/add  methods for  chats/users/login pages
    function displayGreetings(username,room){
        var myself = $("#logged-username");
        myself.empty();
        $("<p class='myself'>Hello! You are logged as "+username+" in chatroom "+room+"</p>").appendTo(myself);
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
            addUser(user);
        }
    }
    function displayMessages(messages) {
        messagesList.empty();
        for(let message of messages){
            addMessage(message);
        }
    }

    function addMessage(message){
        $("<li><span class='username'>"+message.username+": </span><span class='content'>"+message.message+"</span></li>").appendTo(messagesList);
        scrollToBot();
    }

    function addUser(username){
        $("<li id='user-"+username+"'>"+username+"</li>").appendTo(userList);
        $("<li><span class='event'>"+username+" has joined</span>").appendTo(messagesList);
        scrollToBot();
    }
    function removeUser(username){
        $("#user-"+username).remove();
        $("<li><span class='event'>"+username+" has left</span>").appendTo(messagesList);
        scrollToBot();
    }

    function scrollToBot(){
        var scrollArea = $("div.chats");
        scrollArea.scrollTop(scrollArea.prop('scrollHeight'));
    }

    //Start socket.io client here
    var socket = io();

    socket.on('message', function (data) {
        addMessage(data);
    });
    socket.on('joined', function (data) {
        addUser(data);
    });
    socket.on('left', function (data) {
        removeUser(data);
    });

    //Cookies handling
    var username = Cookies.get("username");
    if (username != 'undefined') {
        $("#username").val(username);
    }
    var room = Cookies.get("room");
    if(room != 'undefined'){
        $("#room").val(room);
    }


    //Add button hooks:
    //Send Message button
    $("#send").click(function () {
        const message = {
            username: $("#username").val(),
            password: $("#password").val(),
            message: $("#message").val(),
            room: $("#room").val()
        };
        socket.emit("message",message,function(data){
            if(data && data["status"] == 'OK'){
                addMessage(message);
            }else{
                alert(data.error);
            }
        });
    });


    //Join button
    $("#start").click(function () {
        var options = {
            room: $("#room").val(),
            username: $("#username").val(),
            password: $("#password").val()
        };
        socket.emit("join",options,function(data){
            if(data && data["status"] == 'OK'){
                displayChat();
                displayUsers(data.users);
                displayGreetings(options.username,options.room);
                displayMessages(data.messages);
                Cookies.set("username",options.username);
                Cookies.set("room",options.room);

            }else{
                alert(data.error);
            }
        });
    });

    //Leave room button
    $("#leave").click(function () {
        messagesList.empty();
        userList.empty();
        const message = {
            username: $("#username").val(),
            room: $("#room").val()
        };
        socket.emit("leave",message);
        displayLogin();
    });

    displayLogin();
});

