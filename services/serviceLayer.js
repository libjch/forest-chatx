'use strict';
module.exports = (dir) => {
    const cache = require('./cacheService')();
    const rooms = require('./roomService')(cache);
    return {
        //No need to return cache
        rooms
    };
}