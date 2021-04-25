class AdminMiddleware {
    handle(request, response, next) {
        console.log("Admin Middleware middleware");
        next();
    }
}

module.exports = AdminMiddleware;