const {Beer} = require('../../../models');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const {informationService} = require("../../service");

module.exports = {
    /* 전체 beer 불러오기 */
    getAllBeer: async (req, res) => {
        const {page, size} = req.query;
        const {limit, offset} = await informationService.get_pagination(page, size);

        try {
            const beer_list_all = await Beer.findAndCountAll({
                attributes: [
                    'id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'
                ],
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'DESC']
                ],
                raw: true
            });
            if (!beer_list_all)
                res.status(statusCode.CONFLICT).json({
                    code: "BEER_LIST_ERROR",
                    message: "맥주 데이터를 불러오는 중 에러가 발생했습니다."
                })

            const paginate_data = await informationService.get_paging_data(beer_list_all, page, limit)

            return res.status(statusCode.OK).json(paginate_data);
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
        }
    },
};