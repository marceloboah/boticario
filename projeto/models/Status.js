var db = require('../dbconnection'); //reference of dbconnection.js

var Status = {

    getAllStatus: function (callback) {
        return db.query("Select id,  CAST(status_name AS CHAR(25)) as name from tb_status", callback);
    },
    getStatusById: function (id, callback) {
        console.log("getResellersById id");
        console.log(id);
        var query = "Select id, status_name as name from tb_status where id=?";
        console.log(query);
        return db.query(query, [id], callback);
    },

};
module.exports = Status;