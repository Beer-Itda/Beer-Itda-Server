var express = require('express');
const User = require('../../models/user');
var router = express.Router();
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');
const util = require('../../modules/util');
const sequelize = require('sequelize');

/* GET users listing. */
router.get('/suagongzu', function (req, res, next) {
  res.send('으랏챠 user page 연결');
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'nickname']
    });

    // await User.findAll({
    //   attributes: ['id', 'email', 'nickname']
    // });

    console.log(users);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.NO_USER_ID, users));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.NO_USER_ID));
  }
});
module.exports = router;