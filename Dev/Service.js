const router = require("../routes/api");
const Router = require("./Router/Router");
const RouterCollection = require("./Router/RouterCollection");
const express = require('express');

class Service {

    runningPort = 3000;

    /** @type {Array<Router>} */
    routers = [];

    /**
     * 
     * @param {Array<Router>} routers 
     */
    constructor(routers = []) {
        this.addRouter(routers);
    }

    /**
     * 
     * @param {Array<Router>|Router} router 
     */
    addRouter(router) {
        router = Array.isArray(router) ? router : [router];
        this.routers = [...this.routers, ...router];
        return this;
    }

    express(app) {
        this.expressApp = app;
        return this;
    }

    /**
     * 
     * @returns {RouterCollection}
     */
    collectRoutes() {
        const routeCollection = new RouterCollection();
        this.routers.forEach(router => {
            routeCollection.merge(router.routeCollection);
        });
        return routeCollection;
    }

    appendRoutersToExpress(express) {
        const routerCollection = this.collectRoutes();
        routerCollection.each((route) => {
            
        });
    }

    start() {

    }
}

module.exports = Service;