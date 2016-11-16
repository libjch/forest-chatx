"use strict";

var assert = require('assert');
var Room = require('../../models/room');

const cache = require('../../services/cacheService')();
const roomService = require('../../services/roomService')(cache);

//Room service unit-testing
describe('Room Service', function () {
    describe('Cache Service usage', function () {
        it('Create a new room and add/remove a user', function () {
            roomService.addUserToRoom('user0', 'room1',function (res) {
                assert(res.name="room1");
            });
            roomService.addUserToRoom('user1', 'room1',function (res) {
                assert(res.name="room1");
            });
            roomService.removeUserFromRoom('user1', 'room1',function (res) {
                assert(res);
            });
            roomService.removeUserFromRoom('user1', 'room1',function (res) {
                assert(!res);
            });
            roomService.addUserToRoom('user1', 'room1',function (res) {
                assert(res.name="room1");
            });
        });
        it('Remove user from all rooms',function () {
            roomService.removeUser('user1');
            roomService.removeUserFromRoom('user1', 'room1',function (res) {
                assert(!res);
            });
            roomService.removeUserFromRoom('user0', 'room1',function (res) {
                assert(res);
            });
        });
        it('Get users',function () {
            roomService.addUserToRoom('user0','room1');
            roomService.addUserToRoom('user1','room1');
            roomService.addUserToRoom('user2','room1');
            roomService.getOrCreateRoom('room1',function (room) {
                    assert.equal(room.users.length,3);
            });
        });
        it('Remove all',function () {
            roomService.removeUser('user0');
            roomService.removeUser('user1');
            roomService.removeUser('user2');
            roomService.getOrCreateRoom('room1',function (room) {
                assert.equal(room.users.length,0);
            });
        });
    });

    describe('Multiple Rooms checks', function () {
        it('Create a new room and add/remove a user', function () {
            roomService.addUserToRoom('user1', 'room1');
            roomService.addUserToRoom('user2', 'room2');
            roomService.removeUserFromRoom('user1', 'room2',function (res) {
                assert(!res);
            });
            roomService.removeUserFromRoom('user2', 'room1',function (res) {
                assert(!res);
            });
            roomService.removeUserFromRoom('user1', 'room1',function (res) {
                assert(res);
            });
            roomService.removeUserFromRoom('user2', 'room2',function (res) {
                assert(res);
            });
        });
        it('Remove user from all rooms',function () {
            roomService.addUserToRoom('user1', 'room2');
            roomService.addUserToRoom('user2', 'room1');
            roomService.removeUser('user1');
            roomService.removeUserFromRoom('user1', 'room1',function (res) {
                assert(!res);
            });
            roomService.removeUserFromRoom('user1', 'room2',function (res) {
                assert(!res);
            });
        });
        it('Remove all',function () {
            roomService.removeUser('user0');
            roomService.removeUser('user1');
            roomService.removeUser('user2');
            roomService.getOrCreateRoom('room1',function (room) {
                assert.equal(room.users.length,0);
            });
            roomService.getOrCreateRoom('room2',function (room) {
                assert.equal(room.users.length,0);
            });
        });
    });

});