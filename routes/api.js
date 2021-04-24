const Router = require("../Dev/Router/Router");
const UserController = require("../App/Http/Controllers/UserController");
const ResourceRoute = require("../Dev/Router/ResourceRoute");

const router = new Router();

router.get("/user", "UserController@show").middleware("mama").name("kero");

router.group({ middleware: ['admin'] }, (r) => {
    r.get('/admin', "UserController@index").name("admin.index").middleware("papa")
    r.group({ middleware: 'mama', as: 'shit.', prefix: "user/" }, (rr) => {
        rr.resource('book', 'UserController').expect("create","store")
    });
});

// console.log(router.routeCollection.routes[0].router)

module.exports = router;


