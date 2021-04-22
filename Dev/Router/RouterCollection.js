const Route = require("./Route");

class RouterCollection {
    /**
     * @type {Array.<Route>}
     */
    routes = [];

    add(route) {
        this.routes.push(route);
        return route;
    }
    /**
     * @param {this} collection 
     */
    merge(collection) {
        this.routes = [...collection.routes, ...this.routes];
        return this;
    }
    /**
     * 
     * @param {CallableFunction} callback 
     */
    each(callback) {
        this.routes.forEach((route, index) => callback(route, index));
    }
}

module.exports = RouterCollection;