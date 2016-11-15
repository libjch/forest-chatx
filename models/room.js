"use strict";

function Room(name){
    this.name = name;
    this.users = [];
}

Room.prototype.addUser = function (username) {
    this.users.push(username);
}

module.exports = Room;
