"use strict";

var assert = require('assert');

const cache = require('../../services/cacheService')();
const userService = require('../../services/userService')(cache);

//Room service unit-testing
describe('User Service', function () {
    describe('Cache Service usage', function () {
        it('Create a new user', function () {
            assert(userService.getOrCreateUser('user1','password1').name);
        });
        it('Retrieve user', function () {
            assert(userService.getOrCreateUser('user1','password1').name);
        });
        it('Fail get user', function () {
            assert(userService.getOrCreateUser('user1','password2').error);
        });
    });

});