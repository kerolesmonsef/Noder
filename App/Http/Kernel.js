const applicationMiddleware = require('./Middlewares/ApplicationMiddleware');
const SuperAdmin = require("./Middlewares/SuperAdminMiddleware");
const Admin = require("./Middlewares/AdminMiddleware");
const auth = require("./Middlewares/Auth");
const CorsMiddleware = require('./Middlewares/CorsMiddleWare')

module.exports = {
    /**
     * global middlewares for all requests
     */
    globalMiddlewares: {
        applicationMiddleware,
        CorsMiddleware
    },

    /**
     * 
     */
    routeMiddlewares: {
        auth,
        SuperAdmin,
        Admin
    },

};