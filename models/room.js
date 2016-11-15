"use strict";

var Room = function(name){
    this.name = name;
}

Room.prototype.name = '';
Room.prototype.users = {};

Room.prototype.addUser = function (username) {
    this.users.push(username);
}

module.exports = Room;
