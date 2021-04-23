const Router = require("../Dev/Router/Router");

const router = new Router();


router.get("/useo", "UserController@index");

module.exports = router;