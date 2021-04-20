class ApplicationMiddleware {
    handle(request, response, next) {
        next();
    }
}

module.exports = ApplicationMiddleware;