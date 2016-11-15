'use strict';
var Room = require("../models/room")

module.exports = (cache) => {

    function getOrCreateRoom(name) {
        console.log("calling getData with key " + name)
        let result = cache.get(name);
        if (!result) {
            result = new Room(name);
            cache.set(name, result);
        }
        return result;
    }

    function addUserToRoom(userName, roomName) {
        console.log("Adding "+userName+" to "+ roomName);
        var room = getOrCreateRoom(roomName);
        room.addUser(userName);
        return room;
    }

    function removeUser(userName){
        console.log(cache.keys());
        for(let key of cache.keys()){
            console.log("Removing in "+key);
            cache.get(key).removeUser(userName);
        }
    }

    function removeUserFromRoom(userName,roomName) {
        return cache.get(roomName).removeUser(userName);
    }

    return {
        getOrCreateRoom: getOrCreateRoom,
        addUserToRoom: addUserToRoom,
        removeUser: removeUser,
        removeUserFromRoom: removeUserFromRoom
    }
}