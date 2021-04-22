const Router = require("./Router");

class Route {
    routeName = null;
    automaticInjections = {}
    middlewares = new Set();

    /**
     * 
     * @param {Array|String} methods 
     * @param {String} uri 
     * @param {String} action 
     * @param {Router} router 
     */
    constructor(methods, uri, action, router = null) {
        this.methods = Array.isArray(methods) ? methods : [methods];
        this.uri = uri;
        this.action = action;
        this.router = router;
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

    /**
     * called to add router [ middleware , prefix , as , ... ] to this
     * @param {Router} router 
     */
    prepareActions(router) {
        this.middlewares = new Set([...this.middlewares, ...router.middlewares]);
        this.routeName = router.as + this.routeName;
        this.uri = router.prefix + this.uri;
    }

    /**
     * 
     * @returns 
     */
    getChainName() {
        return `${this.router.as}${this.routeName}`;
    }

    getChainMiddlewares() {
        return new Set([...this.router.middlewares, ...this.middlewares])
    }

    getChainUri() {
        return `${this.router.prefix}${this.uri}`;
    }

    getActionMethod() {
        if (this.action instanceof Function)
            return this.action;

        if (typeof this.action === "string") {
            const controllerMethod = this.action.split("@");
            if (controllerMethod.length != 2) {
                throw new Error(`the Controller And Method should be like "Controller@method" `)
            }
            const [controller, method] = controllerMethod;
            const controllerClass = require(`../../App/Http/Controllers/${controller}`);
            return new controllerClass()[method] 
        }

        if (Array.isArray(this.action) && this.action.length == 2) {
            const [controller, method] = this.action;
            if (typeof controller === "function")
                return new controller()[method]
            else if(typeof controller === "string"){
                const controllerClass = require(`../../App/Http/Controllers/${controller}`);
                return new controllerClass()[method]
            }
        }

        throw new Error("action must be string or array side 2 like laravel");
    }
}

module.exports = Route;