'use strict';
var User = require("../models/user")
var crypto = require('crypto')

/**
 * User service, create or retrieve a user checking that the passwords match.
 */
module.exports = (cache) => {

    function encodePassword(password){
        return  crypto.createHmac("sha1",password)
            .update("this is a secret key that should be loaded from config ;)")
            .digest("hex").toString('base64');
    }

    function getOrCreateUser(username,password,callback) {
        var hashedPassword = encodePassword(password);
        cache.get(username,function (err, value) {
            if(!value){
                value = new User(username,hashedPassword);
                cache.set(username, value);
                callback(null, value);
            }else{
                if(value.password != hashedPassword){
                    callback("Incorrect password",null);
                }else{
                    callback(null,value);
                }
            }
        });
    }


    return {
        getOrCreateUser: getOrCreateUser
    }
}