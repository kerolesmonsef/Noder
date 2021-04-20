class ResourceRoute {
    router = null;
    name = null;
    controller = null;
    middlewares = [];
    onlyRoutes = [];
    expectRoutes = [];


    constructor(router, name, controller) {
        this.router = router;
        this.name = name;
        this.controller = controller;
    }

    only(methods) {
        this.onlyRoutes = Array.isArray(methods) ? methods : arguments;
        return this;
    }

    expect(methods) {
        this.expectRoutes = Array.isArray(methods) ? methods : arguments;
        return this;
    }

    middleware(middleware) {
        this.onlyRoutes = Array.isArray(methods) ? methods : arguments;
        return this;
    }

}

module.exports = ResourceRoute;