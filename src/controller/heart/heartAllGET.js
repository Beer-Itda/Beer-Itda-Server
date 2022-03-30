const { Heart, Beer } = require('../../../models');

const heartService = require('../../service/heartService');
const informationService = require("../../service/informationService");

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;


module.exports = {
/* 찜한 맥주 리스트 전체 불러오기 */
getAllHeart: async (req, res) => {
const user_id = req.token_data.id;
try {
    const { page, size, word } = req.query;
    const { limit, offset } = await informationService.get_pagination(page, size);
    const hearted_array = await heartService.ChangeHeartArray({ user_id });

    const hearted_beers = await Beer.findAndCountAll({
    attributes: ['id','k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery'],
    where: {
        id: { 
        [Op.or]: hearted_array
        },
    },
    limit: limit,
    offset: offset,
    order: [
        ['id', 'DESC']
    ],
    raw: true
    });
    if(!hearted_beers)
    res.status(statusCode.CONFLICT).json({
        code: "BEER_REVIEW_ERROR",
        message: "리스트를 불러오는 중 에러가 발생했습니다."
    });
    const paginate_data= await informationService.get_paging_data(hearted_beers, page, limit);

    return res.status(statusCode.OK).json(paginate_data);
} catch (error) {
    console.error(error);
    return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.FAIL));
}
}
};