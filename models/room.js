"use strict";

function Room(name){
    this.name = name;
    this.users = [];
    this.messages = [];
}

module.exports = Room;
