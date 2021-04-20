class RouterCollection {
    routes = [];

    add(route) {
        this.routes.push(route);
        return route;
    }
}

module.exports = RouterCollection;