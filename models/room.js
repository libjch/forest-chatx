"use strict";

function Room(name){
    this.name = name;
    this.users = [];
}

Room.prototype.addUser = function (username) {
    this.users.push(username);
}

Room.prototype.removeUser = function (username) {
    var index = this.users.indexOf(username);
    if(index>=0){
        console.log('removing '+username);
        return this.users.splice(index,1);
    }else{
        console.log('cant remove '+username);
        return false;
    }
}



module.exports = Room;
