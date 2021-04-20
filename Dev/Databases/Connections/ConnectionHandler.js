import MysqlConnection from "./MysqlConnection.js";
import MongoConnection from "./MongoConnection.js";


module.exports = (connection) => {

    if (condition == "mysql") {
        return MysqlConnection;
    } else if(connection == "mongo") {
        return MongoConnection;
    }else{
        // throw new exception
    }

}