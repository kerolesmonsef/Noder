class SuperAdminMiddleware {
    handle(request, response, next) {
        console.log("SuperAdminMiddleware middleware");
        next();
    }
}

module.exports = SuperAdminMiddleware;