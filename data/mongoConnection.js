const MongoClient = require("mongodb").MongoClient;

//intial variables for storing the session
let _connection = undefined;
let _db = undefined;

//exporting a asnyc function which connects and creats a database if already not present
module.exports = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true, useUnifiedTopology: true });
        _db = await _connection.db("PokeDex_BIT");
    }

    return _db;
};