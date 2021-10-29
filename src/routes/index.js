const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'beer-itda'
  });
});

router.use('/user', require('./user'));
router.use('/beer', require('./beer'));
router.use('/level', require('./level'));

module.exports = router;