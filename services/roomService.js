'use strict';
var Room = require("../models/room")


/**
 * Rooms handling service, use a cache (or a db) in parameter for storage.
 *
 * */
module.exports = (cache) => {

    function getOrCreateRoom(name) {
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
        var rooms = [];
        console.log(cache.keys());
        for(let key of cache.keys()){
            console.log("Removing in "+key);
            if(cache.get(key).removeUser(userName)){
                rooms.push(key);
            }
        }
        return rooms;
    }

    function removeUserFromRoom(userName,roomName) {
        if(cache.get(roomName)){
            return cache.get(roomName).removeUser(userName);
        }
        return false;
    }

    return {
        getOrCreateRoom: getOrCreateRoom,
        addUserToRoom: addUserToRoom,
        removeUser: removeUser,
        removeUserFromRoom: removeUserFromRoom
    }
}