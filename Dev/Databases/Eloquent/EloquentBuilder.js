import BaseWhere from "../Grammar/Where/BaseWhere.js";
import QueryWhere from "../Grammar/Where/QueryWhere.js";
import WhereValuesIn from "../Grammar/Where/WhereValuesIn.js";

class EloquentBuilder {
    /** mysql , sql , mongo , .... */
    databaseType = null;
    wheres = [];
    selectColumns = [];
    orders = [];
    offsetValue = null;
    limitValue = null;


    newQuery() {
        return new EloquentBuilder()
    }

    where(column, operator = null, value = null, boolean = 'and') {

        if (arguments.length === 2) {
            value = operator;
            operator = "=";
        }
        if (column instanceof Function) {
            return this.whereClosure(column, boolean)
        }
        this.wheres.push(new BaseWhere(column, operator, value, boolean));

        return this;
    }

    orWhere(column, operator = null, value = null) {
        if (arguments.length === 2) {
            value = operator;
            operator = "=";
        }

        return this.where(column, operator, value, 'or');
    }

    whereClosure(callback, boolean = 'and') {
        let query = this.newQuery();
        callback(query);
        return this.whereQuery(query, boolean);
    }
    /**
     * addNestedWhereQuery
     * 
     * @param {EloquentBuilder} builder 
     * @param {Boolean} boolean 
     * @returns 
     */
    whereQuery(builder, boolean = 'and') {
        this.wheres.push(new QueryWhere(builder, boolean))
        return this;
    }

    /**
     * 
     * @param {String} column 
     * @param {Array} values 
     * @param {String} boolean 
     * @param {Boolean} not 
     * @returns 
     */
    whereIn(column, values, boolean = 'and', not = false) {
        let type = not ? 'NotIn' : 'In';

        this.wheres.push(new WhereValuesIn(column, values, type, boolean));

        return this;
    }

    /**
     * 
     * @param {String} column 
     * @param {Array} values    
     */
    orWhereIn(column, values) {
        return this.whereIn(column, values, 'or')
    }

    /**
     * 
     * @param {String} column 
     * @param {Array} values 
     * @param {Boolean} boolean 
     * @returns 
     */
    whereNotIn(column, values, boolean = 'and') {
        return this.whereIn(column, values, boolean, true);
    }

    /**
     * 
     * @param {String} column 
     * @param {Array} values 
     * @returns 
     */
    orWhereNotIn(column, values) {
        return this.whereNotIn(column, values, 'or');
    }

    /**
     * 
     * @param {String} column 
     * @param {String} direction 
     */
    orderBy(column, direction = 'asc') {
        this.orders.push({
            column, direction
        });
    }
    /**
     * 
     * @param {String} column 
     * @returns 
     */
    latest(column = 'created_at') {
        return this.orderBy(column, 'desc');
    }

    /**
     * 
     * @param {Number} value 
     */
    offset(value = 0) {
        if (isNaN(value)) {
            throw new Error("the value in offset must be a number")
        }
        this.offsetValue = Math.value(value, 0);
        return this;
    }

    /**
     * 
     * @param {Number} value 
     */
    limit(value) {
        if (!isNaN(value) && value > 0) {
            this.limitValue = value;
        }
        return this;
    }


    /**
     * 
     * @param {Number} page 
     * @param {Number} perPage 
     * @returns 
     */
     forPage(page, perPage = 15)
     {
         return this.offset((page - 1) * perPage).limit(perPage);
     }

    select(columns = ['*']) {
        for (const columns of column) {
            this.selectColumns.push(column);
        }
        return this;
    }
}

module.exports = EloquentBuilder;