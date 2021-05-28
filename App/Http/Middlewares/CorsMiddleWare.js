class CorsMiddleware {
    handle(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        // next();
        console.log("a7a");
    }
}

module.exports = CorsMiddleware;