/** @typedef {import('./Router/Route')} Route */
/** @typedef {import('./Router/Router')} Router */


const router = require("../routes/api");
const RouterCollection = require("./Router/RouterCollection");
const express = require('express');
const MiddlewareHandler = require('./MiddlewareHandler');
const Response = require('./Request/Response');
const {request} = require('./Request/Request');

class Service {

    runningPort = 3000;

    /** @type {Array<Router>} */
    routers = [];

    /** @type {MiddlewareHandler} */
    middlewareHandler = null;


    #listenCallback = () => {
    }

    /**
     *
     * @param {Array<Router>} routers
     */
    constructor(routers = []) {
        this.expressApp = express();

        // this.expressApp.use( (req,res,next) =>{
        //    console.log(next); 
        // });

        routers = Array.isArray(routers) ? routers : Array.from(arguments);
        this.addRouter(routers);
        this.middlewareHandler = new MiddlewareHandler(this)
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


    #appendRoutersToExpress() {
        const routerCollection = this.collectRoutes();
        routerCollection.each((route) => {
            const methodAction = route.getActionMethod();

            if (!methodAction) {
                throw new Error(`the action ${route.action} is invalid please check your routes`)
            }
            this.expressApp[`${route.method}`](route.getChainUri(), (req, res) => {
                // automatic injection here

                methodAction.call(this.expressApp, {
                    res: new Response(res),
                    req: request(req),
                    params: req.params,
                })
            });
        });
    }

    withoutGlobalMiddleware(middlewares = ["*"]) {
        middlewares = Array.isArray(middlewares) ? middlewares : Array.from(arguments);
        this.middlewareHandler.withoutGlobalMiddleware(middlewares);
        return this;
    }

    listenCallback(callback) {
        this.#listenCallback = callback;
        return this;
    }


    start() {

        /**
         * handle global middleware and route middleware
         */
        this.middlewareHandler.handle();

        this.#appendRoutersToExpress();

        this.expressApp.listen(this.runningPort, this.#listenCallback)
    }
}

module.exports = Service;