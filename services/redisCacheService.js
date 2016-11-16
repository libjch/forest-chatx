'use strict';


/**
 * Generic Caching service, used as an "in-memory" DB
 * Will be replaced by a "real db"
 * */

module.exports = function(prefix) {

    var client = require('redis').createClient(process.env.REDIS_URL);

    return {
        get: (key) => {
            return JSON.parse(client.get(prefix+key));
        },
        set: (key,val) => {
            client.set(prefix+key,JSON.stringify(val));
        },
        keys: () => {
            return client.keys('KEYS '+prefix+'*');
        },
    }
}