const { Review } = require("../../../models");
const informationService = require("../../service/informationService");
const statusCode = require("../../../modules/statusCode");

module.exports = {
  //각 맥주에서 보여질 해당 맥주에 대한 리뷰 전체
  getAllReviewByBeer: async (req, res) => {
    try {
      const { page, size, word} = req.query;
      const { limit, offset } = await informationService.get_pagination(page, size);
      //맥주에 대한 파라미터 beer_id 를 받는다.
      //해당 파라미터로 리뷰 테이블을 검색한다.
      const beer_id = parseInt(req.params.beer_id);

      if (!beer_id)
        return res.status(statusCode.NOT_FOUND).json({
          code: "NEED_BEER_ID",
          message: "BEER ID가 존재하지 않습니다."
        });

      const reviewListAll = await Review.findAndCountAll({
        where: {
          beer_id: beer_id
        },
        limit: limit,
        offset: offset,
        order: [
            ['createdAt', 'DESC']
        ],
        raw: true
      });
      //계산 과정 에러
      if (!reviewListAll)
        res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });
      //필터에 맞춰서 검색된 결과로 페이지네이션 적용
      const paginate_data = await informationService.get_paging_data(reviewListAll, page, limit);
      //모두 출력한다.
      return res.status(statusCode.OK).json(paginate_data);
    } catch (error) {
      console.log(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}