const applicationMiddleware = require('./Middlewares/ApplicationMiddleware');
const SuperAdmin = require("./Middlewares/SuperAdminMiddleware");
const Admin = require("./Middlewares/AdminMiddleware");
const auth = require("./Middlewares/Auth");

module.exports = {
    /**
     * global middlewares for all requests
     */
    globalMiddlewares: {
        applicationMiddleware,
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