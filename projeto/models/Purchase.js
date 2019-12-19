var db = require('../dbconnection'); //reference of dbconnection.js

var Purchase = {

    getAllPurchases: function (callback) {
       // return db.query("Select purchase_code as code, purchase_value as valie, purchase_date as date,	purchase_cpf as cpf, purchase_status as statusId,id from tb_purchase", callback);
       //return db.query("select purchase_code as code, purchase_value as valie, purchase_date as date, purchase_cpf as cpf, purchase_status as statusId, tb_status.status_name as statusName, tb_purchase.id from tb_purchase,tb_status where tb_status.id=tb_purchase.purchase_status ", callback);
       return db.query("select purchase_code as code, purchase_value as valie, purchase_date as date, purchase_cpf as cpf, CONCAT(\"{ id:\",purchase_status, \" , name: \", tb_status.status_name, \" }\") AS status, purchase_status as statusId, tb_status.status_name as statusName, tb_purchase.id,tb_purchase.purchase_percent_aplied as percentAplied,tb_purchase.purchase_val_cashback_until_buy as acumulated,tb_purchase.purchase_discount_cashback as dicountCashback from tb_purchase,tb_status where tb_status.id=tb_purchase.purchase_status order by tb_purchase.id desc ", callback);
    },
    getPurchasesByFind: function (Purchase, callback) {
        console.log("Purchase=");
        console.log(Purchase);
        var query = "select  purchase_code as code,	purchase_value as valie, purchase_date as date,	purchase_cpf as cpf, purchase_status as statusId, tb_status.status_name as statusName, tb_purchase.id,tb_purchase.purchase_percent_aplied as percentAplied,tb_purchase.purchase_val_cashback_until_buy as acumulated,tb_purchase.purchase_discount_cashback as dicountCashback  from tb_purchase,tb_status where tb_status.id=tb_purchase.purchase_status  order by tb_purchase.id desc ";
        console.log("1=");
        if(Purchase.cpf != '' && Purchase.cpf != undefined && Purchase.cpf != 'undefined'){
            console.log("2=");
            query += " and purchase_cpf like '%"+Purchase.cpf+"%'";
        }
        if(Purchase.code != '' && Purchase.code != undefined && Purchase.code != 'undefined'){
            console.log("3=");
            query += " and purchase_code = "+Purchase.code;
        }
        if(Purchase.date != '' && Purchase.date != undefined && Purchase.date != 'undefined'){
            console.log("4=");
            query += " and purchase_date = '"+Purchase.date+"'";
        }
        if(Purchase.valie != '' && Purchase.valie != undefined && Purchase.valie != 'undefined'){
            console.log("5=");
            query += " and purchase_value = "+Purchase.valie;
        }
        console.log("6=");
        if(Purchase.status != '' && Purchase.status != undefined && Purchase.status != 'undefined'){
            console.log("7");
            query += " and purchase_status = "+Purchase.status;
        }
        console.log("query");
        console.log(query);
        return db.query(query,  callback);
    },
    getPurchaseById: function (id, callback) {
        console.log("getPurchasesById id");
        console.log(id);
        var query = "select purchase_code as code, purchase_value as valie, purchase_date as date,	purchase_cpf as cpf, purchase_status as statusId, id  from tb_purchase where id=?";
        console.log(query);
        return db.query(query, [id], callback);
    },
    addPurchase: function (Purchase, callback) {
        console.log("addPurchase");
        console.log("Purchase");
        console.log(Purchase);
        if(Purchase.cpf == '15350946056'){
            Purchase.status=2;
        }else{
            Purchase.status=1;
        }
        var query = "Insert into tb_purchase (purchase_code,purchase_cpf,purchase_date,purchase_value,purchase_status,purchase_percent_aplied,purchase_val_cashback_until_buy,purchase_discount_cashback) values ("+ Purchase.code+",'"+Purchase.cpf+"','"+Purchase.date+"',"+Purchase.valie+","+Purchase.status+","+Purchase.percentAplied+","+Purchase.acumulated+","+Purchase.dicountCashback+") ";
        console.log(query);
        return db.query(query, callback);
    },
    deletePurchase: function (id, callback) {
        console.log("deletePurchase id");
        console.log(id);
        return db.query("delete from tb_purchase where id=?", [id], callback);
    },
    updatePurchase: function (id, Purchase, callback) {
        console.log("id");
        console.log(id);
        console.log("Purchase");
        console.log(Purchase); 	 	 	
        console.log(Purchase.status); 	
        console.log(Purchase.status.id); 	 
        console.log(Purchase.id); 	 	 	 	 
        return db.query("update tb_purchase set purchase_code=?,purchase_value=?,purchase_date=?,purchase_cpf=?,purchase_status=? where id=? ", [ Purchase.code, Purchase.valie, Purchase.date, Purchase.cpf, Purchase.status.id, Purchase.id], callback);
    },
    getLoginPurchase: function (Purchase, callback) {
        console.log("Purchase query");
        console.log(Purchase);
        return db.query("select purchase_code as code, purchase_value as value, purchase_date as date, purchase_cpf as cpf, purchase_status as statusId, id  from tb_purchase where purchase_cpf=? and purchase_passwd=?", [Purchase.username, Purchase.passwd], callback);
    }


};
module.exports = Purchase;
