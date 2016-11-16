"use strict";

var assert = require('assert');

const cache = require('../../services/cacheService')();
const userService = require('../../services/userService')(cache);

//Room service unit-testing
describe('User Service:', function () {
    describe('Cache Service usage:', function () {
        it('Create a new user', function () {
            userService.getOrCreateUser('user1','password1',function (err, value) {
                assert(!err);
                assert(value.username == 'user1');
            });
        });
        it('Retrieve same user', function () {
            userService.getOrCreateUser('user1','password1',function (err, value) {
                assert(!err);
                assert(value.username == 'user1');
            });
        });
        it('Fail get user with wrong password', function () {
            userService.getOrCreateUser('user1','password2',function (err, value) {
                assert(err);
            });
        });
    });

});