const Router = require("../Dev/Router/Router");
const UserController = require("../App/Http/Controllers/UserController");

const route = new Router();

const shit = route.get("/user/:user", [UserController, 'show']).middleware("mama").name("kero");

console.log(route.routes);

module.exports = route;