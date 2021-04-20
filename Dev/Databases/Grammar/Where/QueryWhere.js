import IWhere from "./IWhere.js";

class QueryWhere extends IWhere {
    builder = null;

    constructor(builder, boolean = 'and') {
        super(boolean)
        this.builder = builder;
    }
}

module.exports = QueryWhere;