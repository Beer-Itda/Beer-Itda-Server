const { Beer } = require('../../../models');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  // 이달의 beer 불러오기(1개)
  getMonthlyBeer: async (req, res) => {
    try {
      //임시 monthlyBeer
      const monthlyBeer_id = 10;

      //가져온 Beer id 로 부터 맥주정보 불러오기
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