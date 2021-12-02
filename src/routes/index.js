const router = require('express').Router();
const v1 = require('./v1/index');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'beer-itda'
  });
});

router.use('/v1', v1);

module.exports = router;