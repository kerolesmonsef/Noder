const Service = require("./Dev/Service");
const apiRoutes = require("./routes/api");
const webRouters = require('./routes/web')

new Service([apiRoutes, webRouters])
    .port(3000)
    .start();



new Service([apiRoutes, webRouters])
    .port(4000)
    .start();

