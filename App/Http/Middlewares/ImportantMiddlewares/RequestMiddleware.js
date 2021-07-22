class RequestMiddleware {
    handle(req, res, next) {
        
        next();
    }
}


module.exports = RequestMiddleware;
