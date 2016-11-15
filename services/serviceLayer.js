'use strict';
module.exports = (dir) => {
    const roomsCache = require('./cacheService')();
    const userCache = require('./cacheService')();

    const rooms = require('./roomService')(roomsCache);
    const users = require('./userService')(userCache);

    return {
        //No need to return caches
        rooms,
        users
    };
}