var express = require('express');
var router = express.Router();
var Reseller = require('../models/Reseller');
var jwt  = require('jsonwebtoken');

router.post('/login', function (req, res, next) {
      console.log("login");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body);
      Reseller.getLoginReseller(req.body, function (err, rows) {
            console.log("rows");
            console.log(rows);
            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }
      });
});

router.post('/register', function (req, res, next) {
      console.log("register");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body);
      console.log("req.headers");
      console.log(req.headers);
      
      var token = jwt.sign(req.body.email, 'JUJUBA');
      console.log("token>"+token);
      //var verify = jwt.verify('batata', 'JUJUBA');
      //console.log("verify>"+verify);
      
      res.json(token);
      
});

router.post('/validate', function (req, res, next) {
      console.log("validate");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body.usrToken);
      console.log("req.headers");
      console.log(req.headers.authorization);
      
      console.log(req.headers.usr);
      jwt.verify(req.headers.authorization, 'JUJUBA', function (err, payload) {
           
            if (err) {
            return console.log('ERROR: ', err);
            }
            console.log('JWT is valid and payload is\n', payload);
            console.log(payload);
            console.log(req.headers.usr);
            if(payload.trim()==req.headers.usr.trim()){
                  console.log('token verificado e OK');
                  res.json({"ok":"ok"});    
            }else{
                  console.log('token inválido');
                  err = {
                        erro: 'JsonWebTokenError',
                        message: 'token invalido'
                      }
                  res.json(err);    
            }
      });
      
       
});

router.get('/id/:id', function (req, res, next) {
      console.log("req.params");
      console.log(req.params);
      Reseller.getResellerById(req.params.id, function (err, rows) {
            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }
      });
});

router.get('/all', function (req, res, next) {
      console.log("req.params");
      console.log(req.params);


      Reseller.getAllResellers(function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }

      });

});

router.get('/cpf/:cpf/name/:name', function (req, res, next) {
      console.log("req.params1");
      console.log("req.params");
      console.log(req.params);

      Reseller.getResellersByCPFName(req.params, function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }

      });

});

router.post('/', function (req, res, next) {

      Reseller.addReseller(req.body, function (err, count) {
            if (err) {
                  res.json(err);
            }
            else {
                  res.json(req.body);//or return count for 1 &amp;amp;amp; 0
            }
      });
});
router.delete('/:id', function (req, res, next) {

      Reseller.deleteReseller(req.params.id, function (err, count) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(count);
            }

      });
});
router.put('/:id', function (req, res, next) {

      Reseller.updateReseller(req.params.id, req.body, function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }
      });
});




module.exports = router;
