var express = require('express');
var router = express.Router();
var Purchase = require('../models/Purchase');


router.get('/id/:id', function (req, res, next) {
      console.log("req.params");
      console.log(req.params);
      Purchase.getPurchaseById(req.params.id, function (err, rows) {
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


      Purchase.getAllPurchases(function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }

      });

});

router.get('/cpf/:cpf/code/:code/date/:date/valie/:valie/status/:status', function (req, res, next) {
      console.log("req.params1");
      console.log("req.params");
      console.log(req.params);

      Purchase.getPurchasesByFind(req.params, function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }

      });

});

router.post('/', function (req, res, next) {
      console.log("post /");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body);
      Purchase.addPurchase(req.body, function (err, count) {
            if (err) {
                  res.json(err);
            }
            else {
                  res.json(req.body);//or return count for 1 &amp;amp;amp; 0
            }
      });
});
router.delete('/:id', function (req, res, next) {
      console.log("delete ");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body);
      Purchase.deletePurchase(req.params.id, function (err, count) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(count);
            }

      });
});
router.put('/:id', function (req, res, next) {
      console.log("put ");
      console.log("req.params");
      console.log(req.params);
      console.log("req.body");
      console.log(req.body);
      Purchase.updatePurchase(req.params.id, req.body, function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }
      });
});



module.exports = router;
