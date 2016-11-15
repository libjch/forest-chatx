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

    function addUserToRoom(roomName, userName) {
        console.log("Adding "+userName+" to "+ roomName);
        var room = getOrCreateRoom(roomName);
        room.addUser(userName);
        return room;
    }

    return {
        addUserToRoom: (roomName, userName) => {
           return addUserToRoom(roomName,userName);
        }
    }
}