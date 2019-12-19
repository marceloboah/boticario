var express = require('express');
var router = express.Router();
var Status = require('../models/Status');


router.get('/id/:id', function (req, res, next) {
      console.log("req.params");
      console.log(req.params);
      Status.getStatusById(req.params.id, function (err, rows) {
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


      Status.getAllStatus(function (err, rows) {

            if (err) {
                  res.json(err);
            }
            else {
                  res.json(rows);
            }

      });

});


module.exports = router;