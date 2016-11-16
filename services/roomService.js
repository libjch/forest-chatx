'use strict';
var Room = require("../models/room")
var Message = require("../models/message")


/**
 * Rooms handling service, use a cache (or a db) in parameter for storage.
 *
 * */
module.exports = (cache) => {


    function addUser(room,username) {
        if(room.users.indexOf(username)<0){
            room.users.push(username);
            cache.set(room.name,room);
        }
    }

    function removeUser(room,username) {
        var index = room.users.indexOf(username);
        if(index>=0){
            console.log('removing '+username);
            room.users.splice(index,1);
            cache.set(room.name, room);
        }else{
            console.log('cant remove '+username);
        }
    }

    function addMessage(room,message){
        if(room.messages.length>10){
            room.messages = room.messages.slice(1,10);
        }
        room.messages.push(message);
        cache.set(room.name,room);
    }

    function getOrCreateRoom(name,callback) {
        cache.get(name,function (err, value) {
            if (!value) {
                value = new Room(name);
                cache.set(name, value);
            }
            callback(value);
        });
    }

    function addUserToRoom(userName, roomName,callback) {
        console.log("Adding "+userName+" to "+ roomName);
        getOrCreateRoom(roomName,function (room) {
            addUser(room,userName);
            callback(room);
        });
    }

    function recursiveRemove(roomsToRemove,roomsRemoved,userName,callback){
        if(roomsToRemove.length == 0){
            callback(roomsRemoved);
        }else{
            var roomName = roomsToRemove.shift();
            removeUserFromRoom(userName,roomName,function (removed) {
                if(removed){
                    roomsRemoved.push(roomName);
                }
                recursiveRemove(roomsToRemove,roomsRemoved,userName,callback);
            });
        }
    }

    function removeUser(userName,callback){
        cache.keys(function (keys) {
            recursiveRemove(keys,[],userName,callback);
        });
    }

    function removeUserFromRoom(username,roomname,callback) {
        cache.get(roomname,function (err, room) {
            var index = room.users.indexOf(username);
            if(index>=0){
                console.log('removing '+username);
                room.users.splice(index,1);
                cache.set(room.name,room);
                if(callback)
                    callback(true);
            }else{
                console.log('cant remove '+username);
                if(callback)
                    callback(false);
            }
        });
    }

    function addMessageFromUserToRoom(message,username,roomname){
        getOrCreateRoom(roomname,function (room) {
            var messageObject = new Message(username,message);
            addMessage(room,messageObject);
        });
    }

    return {
        getOrCreateRoom: getOrCreateRoom,
        addUserToRoom: addUserToRoom,
        removeUser: removeUser,
        removeUserFromRoom: removeUserFromRoom,
        addMessageFromUserToRoom: addMessageFromUserToRoom
    }
}