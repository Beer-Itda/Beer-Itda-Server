const express = require('express');
const router = express.Router();

router.use('/', require('./users'));
router.use('/detail/:id', require('./users'));


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.use('/user', require('./user'));
router.use('/beer', require('./beer'));
router.use('/level', require('./level'));

module.exports = router;