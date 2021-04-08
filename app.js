import "./Bootstrap/bootstrap.js";
import User from "./App/Models/User.js";


let user = User.query();

let q = user.whereIn("id",[1,2,3])
console.log(q.wheres)

// where ( (name = keroles or ) or name_w = 5) or age > 50
// console.log(__filename);

// const where = new BaseWhere;
// console.log(where.toSql());




