const ResourceRoute = require('./ResourceRoute');
const Route = require('./Route');
const RouterCollection = require('./RouterCollection');
/**
 * all routes is hidden in 
 * 1- route collection this.routes
 * 2- resources
 */
class Router {

    /** @type {RouterCollection} */
    routeCollection = null;
    resources = [];
    prefix = "";
    middlewares = new Set();
    as = "";

    constructor() {
        this.routeCollection = new RouterCollection();
    }

    /**
     * 
     * @param {String} uri 
     * @param {CallableFunction} action 
     * @returns {Route}
     */
    get(uri, action) {
        return this.addRoute('get', uri, action);
    }

    post(uri, action) {
        return this.addRoute('post', uri, action);
    }

    delete(uri, action) {
        return this.addRoute('delete', uri, action);
    }
    /**
     * 
     * @param {String|Array} methods 
     * @param {String} uri 
     * @param {CallableFunction|Array|String} action 
     * @returns {Route}
     */
    addRoute(methods, uri, action) {
        return this.routeCollection.add(this.createRoute(methods, uri, action));
    }

    middleware(middlewares) {
        this.addAction({ middlewares });
        return this;
    }

    createRoute(methods, uri, action) {
        return new Route(methods, uri, action, this);
    }

    resource(name, controller) {
        const resource = new ResourceRoute(this, name, controller);
        this.resources.push(resource);
        return resource;
    }

    group(options, callback) {
        let theCallback = null;
        let theOptions = {};

        if (options instanceof Function) {
            theCallback = options;
        } else if (callback instanceof Function) {
            theOptions = options;
            theCallback = callback;
        } else {
            throw new Error("the group must have a callback method");
        }
        // don't forget current middleware and prefix and name
        /** @type {this} */
        const router = new this.constructor();


        router.addAction({
            middleware: [...(Array.isArray(theOptions.middleware) ? theOptions.middleware : theOptions.middleware ? [theOptions.middleware] : []), ...this.middlewares],
            as: `${this.as}${theOptions.as || ''}`,
            prefix: `${this.prefix}${theOptions.prefix || ''}`,
        });

        theCallback(router);

        this.routeCollection.merge(router.collectRoutes());
    }
    /**
     * collect routes from collection and from resources
     * 
     * @returns {RouterCollection}
     */
    collectRoutes() {
        this.copyRoutesFromResource();
        return this.routeCollection;
    }
    /**
     * you should use this method only once to avoid duplication
     * @returns 
     */
    copyRoutesFromResource(emptyResource = true) {
        this.resources.forEach(resource => resource.pushMethodsToRouter());
        if (emptyResource) this.resources = []
        return this;
    }

    /**
     * action like [as , middleware , prefix]
     * 
     * @param {Object} options 
     */
    addAction(options = {}) {
        if (options['middleware']) {
            this.middlewares = new Set(Array.from(options['middleware']));
        }
        if (options['prefix']) {
            this.prefix = options['prefix'];
        }
        if (options['as']) {
            this.as = options['as']
        }
    }
}

module.exports = Router;