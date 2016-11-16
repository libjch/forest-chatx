'use strict';

/**
 * Service Layer, to expose services & use dependency injections.
 * https://github.com/snielsson/simple-service-layer-architecture-for-node-express-apps/blob/master/README.md
 **/
module.exports = (dir) => {

    if(process.env.REDIS_URL){
        var roomsCache = require('./redisCache')("rooms-");
        var usersCache = require('./redisCache')("users-");
    }else{
        var roomsCache = require('./cacheService')();
        var usersCache = require('./cacheService')();
    }

    const rooms = require('./roomService')(roomsCache);
    const users = require('./userService')(usersCache);

    return {
        //No need to return caches
        rooms,
        users
    };
}