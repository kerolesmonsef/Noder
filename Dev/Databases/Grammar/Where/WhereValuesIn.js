import IWhere from "./IWhere.js";

class WhereValuesIn extends IWhere {

    values = [];
    type = 'In';
    column = null;


    /**
     * 
     * @param {String} column 
     * @param {Array} values 
     * @param {String} type 
     * @param {Boolean} boolean 
     */
    constructor(column, values, type = "In", boolean = "and") {
        super(boolean);
        this.values = values;
        this.type = type;
    }
}

module.exports = WhereValuesIn;
