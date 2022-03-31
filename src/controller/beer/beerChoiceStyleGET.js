const { Beer } = require('../../../models');

const selectService = require('../../service/selectService');
const heartService = require('../../service/heartService');
const informationService = require("../../service/informationService");

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @좋아하는_스타일_맥주_전체_불러오기
 * @desc 좋아하는 스타일 beer 전체 불러오기 (오프셋 페이징)
 */
module.exports = {
  getAllStyleBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const { page, size } = req.query;
    if (!page || !size) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_PAGE_OR_SIZE));
    }
    const { limit, offset } = await informationService.get_pagination(page, size);
    try {
      //스타일 배열로 불러오기
      const value = 'style';
      const styleArray = await selectService.ChangeSelectArray({ user_id, value });
      if (!styleArray) {
        return res.status(statusCode.NOT_FOUND).send({
          message: "선택하신 스타일이 없습니다"
        });
      }
      const beers = await Beer.findAndCountAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'style_id'],
        where: {
          style_id: {
            [Op.or]: styleArray
          }
        },
        limit: limit,
        offset: offset,
        order: [
          ['id', 'ASC']
        ],
        raw: true
      });
      let beers_ids = [];   //[ 2, 11, 43, 111, 141 ]
      for (let i in beers.rows) {
        beers_ids[i] = beers.rows[i].id;
      }

      let heart_list = [];    //[ true, true, false, false, false ]
      for (let i in beers_ids) {
        const beer_id = beers_ids[i];
        const alreadyHeart = await heartService.HeartCheck({ user_id,beer_id });
        if (alreadyHeart === 'Y') { heart_list.push(true); }
        if (alreadyHeart === 'N') { heart_list.push(false); }
      }

      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) { 
          newObj[i] = obj1[i]; 
        }
        for (let i in obj2) { 
          newObj[i].heart = obj2[i];
        }
        return newObj;
      }
      mergeObj(beers.rows, heart_list);
      const result = await informationService.get_paging_data(beers, page, limit);

      return res.status(statusCode.OK).send(result);
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};