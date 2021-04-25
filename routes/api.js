const Router = require("../Dev/Router/Router");
const UserController = require("../App/Http/Controllers/UserController");
const ResourceRoute = require("../Dev/Router/ResourceRoute");

const router = new Router();

router.get("/user", "UserController@show").middleware("auth").name("kero");

router.group({ middleware: ['Admin'] }, (r) => {
    r.get('/admin', "AdminController@index").name("admin.index")
    r.group({ middleware: 'SuperAdmin', as: 'shit.', prefix: "user/" }, (rr) => {
        rr.resource('book', 'UserController').expect("create","store")
    });
});

// console.log(router.routeCollection.routes[0].router)

module.exports = router;


