'use strict';
module.exports = (dir) => {
    const cache = require('./cacheService')();
    const rooms = require('./roomService')(cache);
    return {
        //We don't return cache: it's a private service
        rooms
    };
}