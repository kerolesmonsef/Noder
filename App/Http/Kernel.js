const applicationMiddleware = require('./Middlewares/ImportantMiddlewares/ApplicationMiddleware');
const SuperAdmin = require("./Middlewares/SuperAdminMiddleware");
const Admin = require("./Middlewares/AdminMiddleware");
const auth = require("./Middlewares/Auth");
const CorsMiddleware = require('./Middlewares/ImportantMiddlewares/CorsMiddleWare')
const Test = require("./Middlewares/TestMiddleware");
const RequestMiddleware = require('./Middlewares/ImportantMiddlewares/RequestMiddleware')


module.exports = {
    /**
     * global middlewares for all requests
     */
    globalMiddlewares: {
        RequestMiddleware,
        applicationMiddleware,
        CorsMiddleware,
        Test
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