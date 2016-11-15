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

    function getOrCreateUser(username,password) {
        var hashedPassword = encodePassword(password);
        let result = cache.get(username);
        if (!result) {
            result = new User(username,hashedPassword);
            cache.set(username, result);
        }else{
            if(result.password != hashedPassword){
                return {error: "Incorrect password"};
            }
        }
        return result;
    }


    return {
        getOrCreateUser: getOrCreateUser
    }
}