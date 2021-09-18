const {
  Beer
} = require('../../models/index');

module.exports = {
  // 맥주 세부정보 불러오기
  beerInformation: async (beer_id) => {
    try {
      const beer_Information = await Beer.findOne({
        attributes: ['id', 'k_name', 'e_name', , 'country', 'star_avg', 'thumbnail_image'],
        where: {
          id: beer_id
        },
      });
      return beer_Information;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  //전체 맥주 불러오기
  getAllBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image']
      });
      const result = {};
      result.beers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
}