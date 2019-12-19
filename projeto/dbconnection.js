var mysql=require('mysql');
 var connection=mysql.createPool({
 
host:'localhost',
 user:'root ',
 password:'',
 database:'test',
 port: 3306
 
});
 module.exports=connection;