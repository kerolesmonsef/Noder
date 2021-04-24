class AdminMiddleware {
    handle(request, response, next) {
        console.log("AdminMiddleware middleware");
        next();
    }
}

module.exports = AdminMiddleware;