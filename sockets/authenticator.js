
module.exports = (services) => {
    function authenticatedRequest(request,callback) {
        if(!request.username || !request.password || request.username.length < 1 || request.password.length < 1){
            callback('Invalid username/password format');
        }else{
            services.users.getOrCreateUser(request.username, request.password, function (err,user) {
                callback(err);
            });
        }
    }

    return {
        authenticatedRequest: authenticatedRequest
    }
};