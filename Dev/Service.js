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
        routers = Array.isArray(routers) ? routers : Array.from(arguments);
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


    port(port) {
        this.runningPort = port;
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


    appendRoutersToExpress(expressApp) {
        const routerCollection = this.collectRoutes();
        routerCollection.each((route) => {
            const methodAction = route.getActionMethod();

            if (!methodAction) {
                throw new Error(`the action ${route.action} is invalid please check your routes`)
            }
            expressApp[`${route.method}`](route.getChainUri(), (req, res) => {
                // automatic injection here
                methodAction(req, res, ...Object.values(req.params))
            });
        });
    }

    start() {
        this.expressApp = this.expressApp || express()
        this.appendRoutersToExpress(this.expressApp);
        this.expressApp.listen(this.runningPort)
    }
}

module.exports = Service;