const { Beer } = require('../../../models');

const selectService = require('../../service/selectService');
const heartService = require('../../service/heartService');
const informationService = require("../../service/informationService");
const { informationServie } = require("../../service");

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @좋아하는_향_맥주_전체_불러오기
 * @desc 좋아하는 향 beer 전체 불러오기 (오프셋 페이징)
 */
module.exports = {
  getAllAromaBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const { page, size } = req.query;

    if (!page || !size) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_PAGE_OR_SIZE));
    };

    const { limit, offset } = await informationService.get_pagination(page, size);
    try {
      //향 배열로 불러오기 [ 4, 5, 6, 7, 8 ]
      const value = 'aroma';
      const aromaArray = await selectService.ChangeSelectArray({ user_id, value });
      if (!aromaArray) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
      };

      const beers = await Beer.findAndCountAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        where: {
          [Op.or]: [
            {
            'aroma_id_1': {
              [Op.or]: aromaArray
            },
          }],
          [Op.or]: [{
            'aroma_id_2': {
              [Op.or]: aromaArray
            }
          }],
        },
        limit: limit,
        offset: offset,
        order: [
          ['id', 'ASC']
        ],
        raw: true
      });

      console.log('-----------------',beers);

      var beers_ids = [];   //[ 6, 7, 12, 28 ]
      for (var i = 0 in beers.rows) {
        beers_ids[i] = beers.rows[i].id;
      }

      var heart_list = [];    //[ true, true, false, false, false ]
      for (var i = 0 in beers_ids) {
        const beer_id = beers_ids[i];
        const alreadyHeart = await heartService.HeartCheck({ user_id, beer_id });
        if (alreadyHeart == 'Y') { heart_list.push(true); }
        if (alreadyHeart == 'N') { heart_list.push(false); }
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
      const merge_aroma = mergeObj(beers.rows, heart_list);

      const result = await informationServie.get_paging_data(beers, page, limit);

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_STYLE_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};