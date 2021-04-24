const Route = require("./Route");
const Router = require("./Router");

class ResourceRoute {
    methods = {
        index: {
            method: "get",
            uri: "/uri",
            name: "name.index",
        },
        show: {
            method: "get",
            uri: "/uri/:id",
            name: "name.show",
        },
        create: {
            method: "get",
            uri: "/uri/create",
            name: "name.create",
        },
        store: {
            method: "post",
            uri: "/uri",
            name: "name.store",
        },
        edit: {
            method: "get",
            uri: "/uri/:id/edit",
            name: "name.edit",
        },
        update: {
            method: "put",
            uri: "/uri/:id",
            name: "name.update",
        },
        destroy: {
            method: "delete",
            uri: "/uri/:id",
            name: "name.destroy",
        },
    };
    controller = null;
    middlewares = [];
    onlyRoutes = Object.keys(this.methods);
    expectRoutes = [];

    /**
     * 
     * @param {Router} router 
     * @param {String} name 
     * @param {String} controller 
     */
    constructor(router, name, controller) {
        this.router = router;
        this.name = name;
        this.controller = controller;
    }

    only(methods) {
        this.onlyRoutes = Array.isArray(methods) ? methods : Array.from(arguments);
        return this;
    }

    expect(methods) {
        this.expectRoutes = Array.isArray(methods) ? methods : Array.from(arguments);
        return this;
    }

    middleware(middleware) {
        this.middlewares = Array.isArray(middleware) ? middleware : Array.from(arguments);
        return this;
    }

    pushMethodsToRouter() {
        Object.keys(this.methods)
            .filter(el => this.onlyRoutes.includes(el))
            .filter(el => !this.expectRoutes.includes(el))
            .forEach(controllerMethod => {
                this.pushSingleMethodToRouter(controllerMethod)
            })
    }

    pushSingleMethodToRouter(controllerMethod) {
        const methodObject = this.methods[controllerMethod];
        if (!methodObject) throw new Error(`The ${controllerMethod} doesn't allow in the resource routes`);
        const routeName = methodObject['name'].replace(/name/g, this.name);
        const routeMethod = methodObject['method'];
        const uri = methodObject['uri'].replace(/uri/g, this.name).replace(/id/g, this.name)

        this.router
            .addRoute(routeMethod, uri, `${this.controller}@${controllerMethod}`)
            .name(routeName)
            .middleware(this.middlewares);
    }

}

module.exports = ResourceRoute;