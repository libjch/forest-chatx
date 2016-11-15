
module.exports = (services) => {
    function authenticatedRequest(request,callback) {
        if(!request.username || !request.password || request.username.length < 1 || request.password.length < 1){
            callback({
                status: 'KO',
                error: 'Invalid username/password format'
            })
            return;
        }

        var user = services.users.getOrCreateUser(request.username, request.password);
        if (user.error) {
            callback({
                status: 'KO',
                error: user.error
            })
            return false;
        }
        return true;
    }

    return {
        authenticatedRequest: authenticatedRequest
    }
};