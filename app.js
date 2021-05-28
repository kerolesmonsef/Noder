const Service = require("./Dev/Service");
const apiRoutes = require("./routes/api");
const webRouters = require('./routes/web')


new Service([apiRoutes, webRouters])
    .port(3000)
    .listenCallback(()=>{
        console.log("listing on default port 3000");
    })
    // .withoutGlobalMiddleware("applicationMiddleware")
    .start();


