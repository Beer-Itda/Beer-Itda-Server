const express = require('express');
const router = express.Router();
const {
  Beer
} = require('../../models/beer');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');
const util = require('../../modules/util');
const {
  sequelize
} = require('sequelize');

/* GET users listing. */
router.get('/suagongzu', function (req, res, next) {
  res.send('으랏챠 beer page 연결');
});

router.get('/', async (req, res) => {
  try {
    console.log('왜안돼!!!2');
    const beers = await Beer.findAll({
      attributes: ['id', 'k_name', 'e_name', 'brewery', 'abv', 'thumbnail_image']
    });
    const result = {};
    result.id = beers.id;
    console.log(beers);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, result));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
  }
});

router.get('/:id', async (req, res) => {
  try {
    const beers = await Beer.findOne({
      attributes: ['id', 'k_name', 'e_name', 'brewery', 'abv', 'thumbnail_image'],
      where: {
        id: id,
      }
    })
    console.log(beers);
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.OK, beers));
  } catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
  }
});

module.exports = router;


/*
//1. parameter로 id값을 받아오기 (id값은 인덱스값)
const {
  id
} = req.params;
//2. id값이 유효한지 체크! 존재하지 않는 아이디면 NO_BEER 반환
try {
  const beer = await Beer.findOne({
    where: {
      id: id,
    },
    attributes: ['id', 'k_name', 'e_name', 'brewery', 'abv', 'thumbnail_image', 'star_avg', 'review_count'],
  });
  const result = {};
  result.beer = {
    id,
    k_name,
    e_name
  };
  if (!beer) {
    console.log('존재하지 않는 맥주 아이디 입니다.');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_BEER_ID));
  }
  //3. status:200 message: result 반환
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_USER_SUCCESS, result));
} catch (error) {
  console.error(error);
  return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
}
})
*/