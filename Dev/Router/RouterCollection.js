class RouterCollection {
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
}

module.exports = RouterCollection;