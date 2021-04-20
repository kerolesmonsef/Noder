const ResourceRoute = require('./ResourceRoute');
const Route = require('./Route');
const RouterCollection = require('./RouterCollection');

class Router {

    /** @type {RouterCollection} */
    routes = null;
    resources = [];

    constructor() {
        this.routes = new RouterCollection();
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

    addRoute(methods, uri, action) {
        return this.routes.add(this.createRoute(methods, uri, action));
    }

    createRoute(methods, uri, action) {
        return new Route(methods, uri, action).setRouter(this);
    }

    resource(name, controller) {
        const resource = new ResourceRoute(this, name, controller);
        this.resources.push(resource);
        return resource;
    }
}

module.exports = Router;