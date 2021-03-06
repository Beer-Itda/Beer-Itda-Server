const {Beer, Style_Small, Style, Aroma} = require('../../../models');

const heartService = require('../../service/heartService');
const informationService = require("../../service/informationService");

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @찜한_맥주_전체_불러오기
 * @desc 유저가 찜한 beer 전체 불러오기 (오프셋 페이징)
 */
module.exports = {
    getAllHeartBeer: async (req, res) => {
        const user_id = req.token_data.id;
        const {page, size} = req.query;
        if (!page || !size) {
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_PAGE_OR_SIZE));
        }
        const {limit, offset} = await informationService.get_pagination(page, size);

        try {
            //찜한 맥주 아이디 배열로 불러오기
            const heart_beer_ids = await heartService.ChangeHeartArray({
                user_id,
            });

            const beers = await Beer.findAndCountAll({
                attributes: ['id', 'k_name', 'e_name', 'star_avg', 'brewery', 'thumbnail_image', 'style_id', 'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4'],
                where: {
                    [Op.and]: [
                        {
                            id: heart_beer_ids
                        }]
                },
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'ASC']
                ],
                raw: true
            });
            const beer_data = [];
            for await (let beer_detail of beers.rows) {
                const style_name = await Style.findOne({
                    attributes: ['name'],
                    where: {
                        id: beer_detail.style_id,
                        level: 3
                    }, raw: true
                })
                beer_detail.aroma = []
                if (beer_detail.aroma_id_1) {
                    const aroma_name_1 = await Aroma.findOne({
                        attributes: ['aroma'],
                        where: {
                            id: beer_detail.aroma_id_1
                        },
                        raw: true
                    })
                    beer_detail.aroma.push(aroma_name_1.aroma)
                }
                if (beer_detail.aroma_id_2) {
                    const aroma_name_2 = await Aroma.findOne({
                        attributes: ['aroma'],
                        where: {
                            id: beer_detail.aroma_id_2
                        },
                        raw: true
                    })
                    beer_detail.aroma.push(aroma_name_2.aroma)
                }
                if (beer_detail.aroma_id_3) {
                    const aroma_name_3 = await Aroma.findOne({
                        attributes: ['aroma'],
                        where: {
                            id: beer_detail.aroma_id_3
                        },
                        raw: true
                    })
                    beer_detail.aroma.push(aroma_name_3.aroma)
                }
                if (beer_detail.aroma_id_4) {
                    const aroma_name_4 = await Aroma.findOne({
                        attributes: ['aroma'],
                        where: {
                            id: beer_detail.aroma_id_4
                        },
                        raw: true
                    })
                    beer_detail.aroma.push(aroma_name_4.aroma)
                }
                beer_data.push(beer_detail)
                beer_detail.style = style_name.name
                delete beer_detail.style_id
                delete beer_detail.aroma_id_1
                delete beer_detail.aroma_id_2
                delete beer_detail.aroma_id_3
                delete beer_detail.aroma_id_4
            }
            const heart_status = true; //하트의 상태는 무조건 true로 설정 (찜한 맥주 목록이니까..ㅎㅎ)

            function mergeObj(obj1, obj2) {
                const newObj = [];
                for (let i in obj1) {
                    newObj[i] = obj1[i];
                    newObj[i].heart = obj2;
                }
                return newObj;
            }

            const beers_merge = mergeObj(beers.rows, heart_status);
            const result = await informationService.get_paging_data(beers, page, limit);

            return res.status(statusCode.OK).send(result);
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
        }
    },
};