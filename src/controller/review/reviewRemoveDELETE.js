const { Review } = require("../../../models");
const reviewService = require("../../service/reviewService");
const statusCode = require("../../../modules/statusCode");

module.exports = {
  //내가 작성한 리뷰를 삭제한다.
  removeMyReview: async (req, res) => {
    try {
      //토큰 데이터로 받아온 값으로 리뷰 테이블 검색
      //파라미터로 해당 리뷰 삭제 한다.
      const beer_id = parseInt(req.params.beer_id);
      if (!beer_id)
        return res.status(statusCode.NOT_FOUND).json({
          code: "NEED_BEER_ID",
          message: "BEER ID가 존재하지 않습니다."
        });

      const removeReview = await Review.destroy({
        where: {
          user_id: req.token_data.id,
          beer_id: req.params.beer_id
        }
      });
      if (!removeReview)
        res.status(statusCode.CONFLICT).json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });

      //리뷰정보 삭제 후 beer 정보 업데이트
      await reviewService.calcReviewData(beer_id);
      //리뷰 삭제 후 유저 리뷰 카운트 업데이트
      await reviewService.user_review_calc('REMOVE', req.token_data.id);

      return res.status(statusCode.OK).json({
        message: "리뷰가 삭제되었습니다."
      })
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}