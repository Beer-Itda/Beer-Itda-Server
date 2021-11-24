var express = require('express');
const Level = require('../../models/level');
var router = express.Router();
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');
const util = require('../../modules/util');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const levels = await Level.findAll({});
    console.log(levels);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, levels));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
  }
});

module.exports = router;