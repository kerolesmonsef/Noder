class Route {

    methods = [];
    uri = null;
    action = null;
    routeName = null;
    automaticInjections = {}
    middlewares = new Set();
    router = null;

    /**
     * 
     * @param {Array,String} methods 
     * @param {String} uri 
     * @param {String} action 
     */
    constructor(methods, uri, action) {
        this.methods = methods instanceof Array ? methods : [methods];
        this.uri = uri;
        this.action = action;
    }

    name(name) {
        this.routeName = name;
        return this;
    }
    /**
     * search for models on database and return it into the route action 
     * 
     * @param {Object} object 
     * @returns 
     */
    automaticInjection(object = {}) {
        this.automaticInjections = object;
        return this;
    }

    middleware(middleware) {
        const arrayMiddlewares = Array.isArray(middleware) ? middleware : arguments;
        const setMiddlewares = new Set(arrayMiddlewares);
        this.middlewares = new Set([...this.middlewares, ...setMiddlewares]);
        return this;
    }

    setRouter(router) {
        this.router = router;
        return this;
    }
}

module.exports = Route;