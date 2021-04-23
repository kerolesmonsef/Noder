const Router = require("../Dev/Router/Router");
const UserController = require("../App/Http/Controllers/UserController");
const ResourceRoute = require("../Dev/Router/ResourceRoute");

const router = new Router();

router.get("/user/:user/:aa", "UserController@show").middleware("mama").name("kero");
// router.resource('user', 'UserController');


router.group({ middleware: ['admin'] }, (r) => {
    r.get('/admin', "UserController@index").name("admin.index")
    r.group({ middleware: 'superAdmin', as: 'shit.', prefix: "user/" }, (rr) => {
        // rr.get("super_admin", "SuperAdminController@index").name("super_admin.index").middleware("kaka");
        // rr.resource('user', 'UserController')
    });
});

// console.log(router.routeCollection.routes[1].getActionMethod())

module.exports = router;


