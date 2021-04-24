class ApplicationMiddleware {
    handle(request, response, next) {
        console.log("application middleware");
        next();
    }
}

module.exports = ApplicationMiddleware;