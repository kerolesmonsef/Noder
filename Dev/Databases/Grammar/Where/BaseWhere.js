import IWhere from "./IWhere.js";

class BaseWhere extends IWhere{
    column = null;
    operator = null;
    value = null;

    constructor(column, operator = null, value = null, boolean = 'and'){
        super(boolean);
        this.column = column;
        this.operator = operator;
        this.value = value;
    }

    toSql(){
        return "shit where base"
    }
}
module.exports = BaseWhere;