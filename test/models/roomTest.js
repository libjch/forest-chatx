//Room service unit-testing
var Room =  require("../../models/room");
var assert = require('assert');

describe('Room Model:', function () {
    var room = new Room("name");
    it('Add/Remove user', function () {
        room.addUser("name1");
        assert(room.users.length==1);
        assert(room.removeUser("name1"));
        assert(room.users.length==0);
    });
    it('Add messages',function () {
        room.addMessage('msg0');
        room.addMessage('msg1');
        assert(room.messages.length==2);
    });

    it('GetLastMessages count',function () {
        assert.equal(room.getLastMessages(3).length,2,"only 2 messages in the store");
        assert.equal(room.getLastMessages(0).length,0,"asked for 0 messages");
        assert.equal(room.getLastMessages(1).length,1,"asked for 1 message");
    });

    it('GetLastMessages content',function () {
        assert.equal(room.getLastMessages(1)[0],"msg1");
        assert.equal(room.getLastMessages(2)[0],"msg0");
    });
});