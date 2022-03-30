const {Review, Beer, Style, Country, Aroma} = require("../../../models");
const statusCode = require("../../../modules/statusCode");
const informationService = require("../../service/informationService");
const util = require("../../../modules/util");

module.exports = {
    //나의 페이지에서 내가 작성한 모든 리뷰를 불러온다.
    readMyReviewList: async (req, res) => {
        try {
            const {page, size, word} = req.query;
            const {limit, offset} = await informationService.get_pagination(page, size);
            //토큰 데이터를 이용하여 리뷰 테이블에서 검색한다.
            const my_review = await Review.findAndCountAll({
                where: {
                    user_id: req.token_data.id
                },
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', 'DESC']
                ],
                raw: true
            });

            //계산 과정에서의 에러
            if (!my_review)
                return res.status(statusCode.CONFLICT).json({
                    code: "BEER_REVIEW_ERROR",
                    message: "리뷰를 불러오는 중 에러가 발생했습니다."
                });
            //필터에 맞춰서 검색된 결과로 페이지네이션 적용
            const paginate_data = await informationService.get_paging_data(my_review, page, limit);
            //맥주 데이터와 리뷰 데이터를 합쳐서 전체 출력
            const result_my_review = await review_plus_beer(paginate_data.data);
            //출력된 데이터 모두를 출력한다.
            return res.status(statusCode.OK).json({
                "total_data": paginate_data.total_data,
                "data": result_my_review,
                "total_page": paginate_data.total_page,
                "current_page": paginate_data.current_page,
                "previous_page": paginate_data.previous_page,
                "next_page": paginate_data.next_page
            });
        } catch (error) {
            console.log(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json(error);
        }
    }
};

async function review_plus_beer(my_review) {
    const all_my_review = [];
    for (let i = 0; i < my_review.length; i++) {
        const beer_id = my_review[i].beer_id;
        const beer_data_by_review = await Beer.findOne({where: {id: beer_id}, raw: true});
        const beer_data = [];
        const style_name = await Style.findOne({
            attributes: ['name'],
            where: {
                id: beer_data_by_review.style_id,
                level: 3
            }, raw: true
        })
        const country_name = await Country.findOne({
            attributes: ['country'],
            where: {
                id: beer_data_by_review.country_id
            },
            raw: true
        })
        beer_data_by_review.aroma = []
        if (beer_data_by_review.aroma_id_1) {
            const aroma_name_1 = await Aroma.findOne({
                attributes: ['aroma'],
                where: {
                    id: beer_data_by_review.aroma_id_1
                },
                raw: true
            })
            beer_data_by_review.aroma.push(aroma_name_1.aroma)
        }
        if (beer_data_by_review.aroma_id_2) {
            const aroma_name_2 = await Aroma.findOne({
                attributes: ['aroma'],
                where: {
                    id: beer_data_by_review.aroma_id_2
                },
                raw: true
            })
            beer_data_by_review.aroma.push(aroma_name_2.aroma)
        }
        if (beer_data_by_review.aroma_id_3) {
            const aroma_name_3 = await Aroma.findOne({
                attributes: ['aroma'],
                where: {
                    id: beer_data_by_review.aroma_id_3
                },
                raw: true
            })
            beer_data_by_review.aroma.push(aroma_name_3.aroma)
        }
        if (beer_data_by_review.aroma_id_4) {
            const aroma_name_4 = await Aroma.findOne({
                attributes: ['aroma'],
                where: {
                    id: beer_data_by_review.aroma_id_4
                },
                raw: true
            })
            beer_data_by_review.aroma.push(aroma_name_4.aroma)
        }
        beer_data.push(beer_data_by_review)
        beer_data_by_review.country = country_name.country
        beer_data_by_review.style = style_name.name
        delete beer_data_by_review.country_id
        delete beer_data_by_review.style_id
        delete beer_data_by_review.aroma_id_1
        delete beer_data_by_review.aroma_id_2
        delete beer_data_by_review.aroma_id_3
        delete beer_data_by_review.aroma_id_4

        const add_beer_review_data = {
            'beer': beer_data_by_review,
            'review': my_review[i]
        };
        all_my_review.push(add_beer_review_data);
    }
    return all_my_review;
}
