// const test = require("../../../Dev/Validation/Types/Required");

class TestMiddleware {
    handle(request, response, next) {
        next();
    }
}

module.exports = TestMiddleware;