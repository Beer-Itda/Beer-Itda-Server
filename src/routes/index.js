const express = require('express');
const router = express.Router();

router.use('/', require('./users'));
router.use('/detail/:BeerName', require('./users'));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
module.exports = router;