'use strict';


module.exports = function() {
    let cache = {};
    return {
        get: (key) => {
            let value = cache[key];
            if(!value)
                console.log("Cache miss for key: " + key);
            return value;
        },
        set: (key,val) => {
            cache[key] = val;
        },
        clear: () => {
            cache = {};
        }
    }
}