"use strict";

function Room(name){
    this.name = name;
    this.users = [];
    this.messages = [];
    this.idMessage = 0;
}

Room.prototype.addUser = function (username) {
    if(this.users.indexOf(username)<0){
        this.users.push(username);
    }
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

Room.prototype.addMessage = function (message){
    this.messages[this.idMessage++] = message;
}

Room.prototype.getLastMessages = function (number) {
    if(number<1)
        return [];
    if(number>this.messages.length)
        number = this.messages.length;
    return this.messages.slice(this.messages.length-number,this.messages.length);
}



module.exports = Room;
