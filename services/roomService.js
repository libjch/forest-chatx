'use strict';
var Room = require("../models/room")

module.exports = (cache) => {
    return {
        getOrCreateRoom: (name) => {
            console.log("calling getData with key " + name)
            let result = cache.get(name);
            if (!result) {
                result = new Room(name);
                cache.set(name, result);
            }
            return result;
        },
        addUserToRoom: (roomName, userName) => {
            console.log("Adding "+userName+" to "+ roomName);
            var room = this.getOrCreateRoom(roomName);
            room.addUser(userName);
        }
    }
}