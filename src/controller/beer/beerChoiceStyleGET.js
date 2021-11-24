var express = require('express');
var dbConObj = require('../../../config/db_info');
var dbconn = dbConObj.init();

const {
  Beer,
  Style_Small,
  Country,
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//const beerService = require("../service/beerService");

module.exports = {
  // 좋아하는 스타일 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllStyleBeer: async (req, res) => {
    const user_id = req.body.user_id;

    try {
      const userSelectStyle = await Select.findOne({
        attributes: ['style'],
        where: {
          id: user_id,
        }
      });
      // userSelectStyle와 JSON.stringify(userSelectStyle)의 type
      console.log(`---userSelectStyle의 type : ${typeof(userSelectStyle)}`);
      console.log(`---JSON.stringify(userSelectStyle)의 type : ${typeof(JSON.stringify(userSelectStyle))}`);

      console.log(`---JSON.stringify(userSelectStyle) >>> ${JSON.stringify(userSelectStyle)}`);
      console.log(`---JSON.stringify(userSelectStyle)[0] >>> ${ JSON.stringify((userSelectStyle)[0]) }`);
      const a = JSON.stringify((userSelectStyle)[0]);
      const b = (JSON.stringify(userSelectStyle))[2];
      const c = userSelectStyle.toString();
      console.log(a, typeof (a), '\n\n', b, typeof (b), '\n\n', c[0], typeof (c));

      /*
      const abc = Object.values(userSelectStyle);      
      const objtostr = JSON.stringify(userSelectStyle);
      console.log(objtostr, '\n\n');
      */


      // 배열의 값 숫자만큼 for문 돌리기
      var st = new Array();
      for (var i = 0; i < 5; i++) {
        if (userSelectStyle[i] != 'null') {
          st[i] = JSON.stringify(userSelectStyle[i]);
          console.log(`배열값 ${i} 작성 : ${st[i]}`);
          //console.log("배열값 작성: ", i, ": ", st[i]);
        }
      }


      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'style_id'],
        where: {
          style_id: {
            [Op.or]: [1, 2, 3]
          }
        }
      });
      //좋아하는 스타일 불러오는 로직
      const result = {};
      result.Stylebeers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};