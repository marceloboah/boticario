var db = require('../dbconnection'); //reference of dbconnection.js

var Reseller = {

    getAllResellers: function (callback) {
        return db.query("Select reseller_complete_name as completeName, reseller_cpf as cpf, reseller_email as email,id from tb_reseller", callback);
    },
    getResellersByCPFName: function (Reseller, callback) {
        console.log("Reseller=");
        console.log(Reseller);
        var query = "select  reseller_complete_name as completeName, reseller_cpf as cpf, reseller_email as email, id  from tb_reseller where 1=1 ";
        console.log("1=");
        if(Reseller.cpf != ''){
            console.log("2=");
            query += " and reseller_cpf like '%"+Reseller.cpf+"%'";
        }
        console.log("3=");
        if(Reseller.name != ''){
            console.log("4");
            query += " and reseller_complete_name like '%"+Reseller.name+"%'";
        }
        console.log("query");
        console.log(query);
        return db.query(query,  callback);
    },
    getResellerById: function (id, callback) {
        console.log("getResellersById id");
        console.log(id);
        var query = "select  reseller_complete_name as completeName, reseller_cpf as cpf, reseller_email as email, id  from tb_reseller where id=?";
        console.log(query);
        return db.query(query, [id], callback);
    },
    addReseller: function (Reseller, callback) {
        console.log("addReseller");
        console.log("Reseller");
        console.log(Reseller);
        return db.query("Insert into tb_reseller (reseller_complete_name,reseller_cpf,reseller_email,reseller_passwd) values(?,?,?,?)", [ Reseller.completeName, Reseller.cpf, Reseller.email, Reseller.passwd], callback);
    },
    deleteReseller: function (id, callback) {
        console.log("deleteReseller id");
        console.log(id);
        console.log("Reseller");
        console.log(Reseller);
        return db.query("delete from tb_reseller where id=?", [id], callback);
    },
    updateReseller: function (id, Reseller, callback) {
        console.log("id");
        console.log(id);
        console.log("Reseller");
        console.log(Reseller);
        return db.query("update tb_reseller set reseller_complete_name=?,reseller_cpf=?,reseller_email=? where id=? ", [ Reseller.completeName, Reseller.cpf, Reseller.email, Reseller.id], callback);
    },
    getLoginReseller: function (Reseller, callback) {
        console.log("Reseller query");
        console.log(Reseller);
        return db.query("select  reseller_complete_name as completeName, reseller_cpf as cpf, reseller_email as email, id  from tb_reseller where reseller_email=? and reseller_passwd=?", [Reseller.username, Reseller.passwd], callback);
    },




};
module.exports = Reseller;
