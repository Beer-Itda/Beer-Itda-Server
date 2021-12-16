const { Review } = require("../../../models");

module.exports = {
  //각 맥주에서 보여질 해당 맥주에 대한 리뷰 전체
  getAllReviewByBeer: async (req, res) => {
    try {
      //맥주에 대한 파라미터 beer_id 를 받는다.
      //해당 파라미터로 리뷰 테이블을 검색한다.
      const beer_id = parseInt(req.params.beer_id);

      if (!beer_id)
        return res.json({
          code: "NEED_BEER_ID",
          message: "BEER ID가 존재하지 않습니다."
        });

      const reviewListAll = await Review.findAll({
        where: {
          beer_id: beer_id
        }
      });
      if (!reviewListAll)
        res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });
      return res.json(reviewListAll);
      //모두 출력한다.
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}