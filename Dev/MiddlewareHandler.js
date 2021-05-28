/** @typedef {import('./Service')} Service */
const { globalMiddlewares, routeMiddlewares } = require.main.require("./App/Http/Kernel");


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

        for (const middleware_i in middlewareRouteMapper) {
            if (!(middleware_i in routeMiddlewares)) {
                throw new Error(`middleware "${middleware_i}" doesn't exists in [App\Http\Kernel routeMiddlewares]`)
            }
            const routes = middlewareRouteMapper[middleware_i];
            const handle = new routeMiddlewares[middleware_i]().handle
            this.#service.expressApp.use(routes, handle)
        }
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
            console.log(this.#service);
        });

    }

}

module.exports = MiddlewareHandler;