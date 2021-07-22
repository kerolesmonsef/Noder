const Router = require("../Dev/Router/Router");

const router = new Router();


router.get("/useo", "UserController@index");//.middleware('Test');

module.exports = router;