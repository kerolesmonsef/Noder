/** @typedef {import('./Service')} Service */
const { globalMiddlewares } = require.main.require("./App/Http/Kernel");


class MiddlewareHandler {
    #withoutGlobalMiddlewares = [];

    /** @type {Service} */
    #service = null;
    
    /** 
     * @param {Service} service 
     */
    constructor(service) {
        this.#service = service;
    }

    withoutGlobalMiddleware(middlewares = ["*"]) {
        this.#withoutGlobalMiddlewares = middlewares;
        return this;
    }

    handle() {
        this.#handleRouteMiddlewares();

        this.#handleGlobalMiddleware();
    }

    /**
     * 
     * @param {Object} middlewareMapper 
     * @param {Route} route 
     */
    #updateMiddlewareMapper(middlewareMapper = {}, route) {
        for (const middleware_i of route.getChainMiddlewares()) {
            if (!(middleware_i in middlewareMapper)) {
                middlewareMapper[middleware_i] = [];
            }

            middlewareMapper[middleware_i].push(route.getChainUri());
        }
    }

    #handleRouteMiddlewares() {
        const middlewareRouteMapper = {};
        const routerCollection = this.#service.collectRoutes();
        routerCollection.each((route) => {
            this.#updateMiddlewareMapper(middlewareRouteMapper, route);
        });
    }

    #handleGlobalMiddleware() {
        const remove_all = this.#withoutGlobalMiddlewares.indexOf("*") >= 0;
        if (remove_all) {
            return;
        }

        const filteredGlobalMiddlewares = Object.keys(globalMiddlewares).filter((el) => {
            return this.#withoutGlobalMiddlewares.indexOf(el) < 0;
        });

        filteredGlobalMiddlewares.forEach((middleware) => {
            const handle = new globalMiddlewares[middleware]().handle
            this.#service.expressApp.use(handle)
        });

    }

}

module.exports = MiddlewareHandler;