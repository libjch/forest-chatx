'use strict';

/**
 * Service Layer, to expose services & use dependency injections.
 * https://github.com/snielsson/simple-service-layer-architecture-for-node-express-apps/blob/master/README.md
 **/
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