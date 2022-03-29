const { Beer, Style_Small, Aroma } = require('../../../models');

const heartService = require('../../service/heartService');
const informationService = require("../../service/informationService");

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

  /**
 * @랜덤_맥주_전체_불러오기
 * @desc 랜덤으로 beer 전체 불러오기 (오프셋 페이징)
 */
module.exports = {

  getRandomBeer: async (req, res) => {
    const user_id = req.token_data.id;
    const { page, size } = req.query;
    if (!page || !size) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_PAGE_OR_SIZE));
    };

    const { limit, offset } = await informationService.get_pagination(page, size);
    

    try {
      const beers = await Beer.findAndCountAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image','style_id','aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
        limit: limit,
        offset: offset,
        order: [ Sequelize.literal('RAND()') ],
        raw: true
      });

      let beers_ids = [];   //[ 6, 7, 12, 28 ]
      for (let i in beers.rows) {
        beers_ids[i] = beers.rows[i].id;
      }

      let heart_list = []; //[ true, true, false, false, false ]
      for (let i in beers_ids) {
        const beer_id = beers_ids[i];
        const alreadyHeart = await heartService.HeartCheck({ user_id, beer_id });
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
      const merge_style = mergeObj(beers.rows, heart_list);
      const result = await informationService.get_paging_data(beers, page, limit);

      return res.status(statusCode.OK).send(result);
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};