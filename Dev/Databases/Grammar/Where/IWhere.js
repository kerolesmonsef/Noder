class IWhere {
    boolean = "and";
    bindings = [];
    /**
     * 
     * @param {String} boolean 
     */
    constructor(boolean = 'and') {
        this.boolean = boolean;
    }

    toSql() {
        throw new Error("you should override this method")
    }
}

module.exports = IWhere;