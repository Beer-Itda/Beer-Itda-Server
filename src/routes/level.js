var express = require('express');
const Level = require('../../models');
var router = express.Router();

/* GET users listing. */
router.get('/suagongzu', function (req, res, next) {
  res.send('으랏챠 level page 연결');
});

router.get('/', async (req, res, next) => {
  try {
    const levels = await Level.findAll();
    console.log(levels);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, levels));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;