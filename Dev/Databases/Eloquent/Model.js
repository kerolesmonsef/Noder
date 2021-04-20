'use strict';

import Str from "../../Helpers/String/Str.js";
import EloquentBuilder from "./EloquentBuilder.js";


class Model {
    exists = false;
    connection = null;
    globalScopes = [];
    perPage = 15;
    attributes = {};
    table = null;

    /**
     * 
     * @param {Object} attributes 
     */
    constructor(attributes = {}) {
        this.attributes = attributes;
    }


    getTable() {
        return this.table || this.getTableFromClassName()
    }


    getTableFromClassName() {
        return Str.snake(Str.plural(this.constructor.name));
    }

    /**
     * 
     * @returns { Model }
     */
    getConnection() {
        // return this.resolveConnection(this.connection);
    }
    static query() {
        return new EloquentBuilder;
    }
}


module.exports = Model;