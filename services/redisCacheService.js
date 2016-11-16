'use strict';


/**
 * Generic Caching service, used as an "in-memory" DB
 * Will be replaced by a "real db"
 * */

module.exports = function(prefix) {

    var client = require('redis').createClient(process.env.REDIS_URL);

    return {
        get: (key,callback) => {
            client.get(prefix+key,function (err, value) {
                if(err){
                    callback(err, null);
                }else{
                    callback(null,JSON.parse(value));
                }
            });
        },
        set: (key,val) => {
            client.set(prefix+key,JSON.stringify(val));
        },
        keys: (callback) => {
            return client.keys(prefix+'*',function (err, values) {
                if(err){
                    callback(err, null);
                }else{
                    values = values.map(function(v){ return v.slice(prefix.length); });
                    callback(values);
                }
            });
        },
    }
}