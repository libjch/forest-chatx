"use strict";

var assert = require('assert');

const cache = require('../../services/cacheService')();
const roomService = require('../../services/roomService')(cache);

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
        it('Remove all',function () {
            roomService.removeUser('user0');
            roomService.removeUser('user1');
            roomService.removeUser('user2');
            assert(roomService.getOrCreateRoom('room1').users.length==0);
        });
    });

    describe('Multiple Rooms checks', function () {
        it('Create a new room and add/remove a user', function () {
            assert(roomService.addUserToRoom('user1', 'room1'));
            assert(roomService.addUserToRoom('user2', 'room2'));
            assert(roomService.removeUserFromRoom('user1', 'room2') == false);
            assert(roomService.removeUserFromRoom('user2', 'room1') == false);

            assert(roomService.removeUserFromRoom('user1', 'room1'));
            assert(roomService.removeUserFromRoom('user2', 'room2'));
        });
        it('Remove user from all rooms',function () {
            assert(roomService.addUserToRoom('user1', 'room2'));
            assert(roomService.addUserToRoom('user2', 'room1'));
            roomService.removeUser('user1');
            assert(roomService.removeUserFromRoom('user1','room1') == false);
            assert(roomService.removeUserFromRoom('user1','room2') == false);
        });
        it('Remove all',function () {
            roomService.removeUser('user0');
            roomService.removeUser('user1');
            roomService.removeUser('user2');
            assert(roomService.getOrCreateRoom('room1').users.length==0);
            assert(roomService.getOrCreateRoom('room2').users.length==0);
        });
        it('Get users',function () {
            assert(roomService.addUserToRoom('user0','room1'));
            assert(roomService.addUserToRoom('user1','room1'));
            assert(roomService.addUserToRoom('user2','room2'));
            assert(roomService.getOrCreateRoom('room1').users.length==2);
            assert(roomService.getOrCreateRoom('room2').users.length==1);
        });
    });

});