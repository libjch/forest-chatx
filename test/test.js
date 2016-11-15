
var assert = require('assert');

const cache = require('../services/cacheService')();
const roomService = require('../services/roomService')(cache);

//Room service unit-testing
describe('Room Service', function () {
    describe('Cache Service usage', function () {
        it('Create a new room and add/remove a user', function () {
            assert(roomService.addUserToRoom('user0', 'room1'));
            assert(roomService.addUserToRoom('user1', 'room1'));
            assert(roomService.removeUserFromRoom('user1', 'room1'));
            assert(roomService.removeUserFromRoom('user1', 'room1') == false);
            assert(roomService.addUserToRoom('user1', 'room1'));
        });
        it('Remove user from all rooms',function () {
            assert(roomService.removeUserFromRoom('user1', 'room1'));
            assert(roomService.addUserToRoom('user1', 'room1'));
            roomService.removeUser('user1');
            assert(roomService.removeUserFromRoom('user1','room1') == false);
            assert(roomService.removeUserFromRoom('user0','room1'));
        });
        it('Get users',function () {
            assert(roomService.addUserToRoom('user0','room1'));
            assert(roomService.addUserToRoom('user1','room1'));
            assert(roomService.addUserToRoom('user2','room1'));
            assert(roomService.getOrCreateRoom('room1').users.length==3);
        });

    });
});