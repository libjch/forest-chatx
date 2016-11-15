'use strict';
var User = require("../models/user")
var crypto = require('crypto')

module.exports = (cache) => {

    function encodePassword(password){
        return  crypto.createHmac("sha1",password)
            .update("this is a secret key that should be loaded from config ;)")
            .digest("hex").toString('base64');
    }

    function getOrCreateUser(name,password) {
        var hashedPassword = encodePassword(password);
        let result = cache.get(name);
        if (!result) {
            result = new User(name,hashedPassword);
            cache.set(name, result);
        }else{
            if(result.password == hashedPassword){
                return result;
            }else{
                return {error: "Incorrect password"};
            }
        }
    }


    return {
        getOrCreateUser: getOrCreateUser
    }
}