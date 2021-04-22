const Router = require("../Dev/Router/Router");
const UserController = require("../App/Http/Controllers/UserController");
const ResourceRoute = require("../Dev/Router/ResourceRoute");

const router = new Router();

router.get("/user/:user", [UserController, 'show']).middleware("mama").name("kero");
// router.resource('user', 'UserController');
router.group((r) => {
    r.get('/person',"UserController@person").name("person.index")
    r.resource("shit","ShitController");
});

console.log(router.routeCollection)

module.exports = router;


