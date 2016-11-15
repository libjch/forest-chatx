'use strict';


/**
 * Generic Caching service, used as an "in-memory" DB
 * Will be replaced by a "real db"
 * */

module.exports = function() {
    let cache = {};
    return {
        get: (key) => {
            return cache[key];
        },
        set: (key,val) => {
            cache[key] = val;
        },
        keys: () => {
            return Object.keys(cache);
        },
    }
}