var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ngTodo' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'ngTodo' });
});

router.get('/purchasescrud', function(req, res, next) {
  res.render('purchasescrud', { title: 'ngTodo' });
});

router.get('/resellerscrud', function(req, res, next) {
  res.render('resellerscrud', { title: 'ngTodo' });
});

module.exports = router;
