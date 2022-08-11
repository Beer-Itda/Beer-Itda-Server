const { Beer } = require('../../../models');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

/**
 * @이달의_맥주_정보_불러오기
 * @desc 이달의 맥주 정보 불러오기
 */
module.exports = {
  getMonthlyBeer: async (req, res) => {
    try {
      //임시 monthlyBeer
      const monthlyBeer_id = 10;

      const beers = await Beer.findOne({
        attributes: ['id', 'k_name', 'star_avg', 'thumbnail_image'],
        where: {
          id: monthlyBeer_id
        },
        raw: true
      });
      return res.status(statusCode.OK).send(beers);
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};