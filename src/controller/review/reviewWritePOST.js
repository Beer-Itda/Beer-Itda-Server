const { Review } = require("../../../models");
const reviewService = require("../../service/reviewService");

module.exports = {
  //해당 맥주에 나의 리뷰 작성.
  writeMyReview: async (req, res) => {
    try {
      //리뷰 테이블에 작성하는데 입력을
      //파라미터로 받은 id와 토큰 데이터로 진행
      const beer_id = parseInt(req.params.beer_id);

      if (!beer_id)
        return res.json({
          code: "NEED_BEER_ID",
          message: "BEER ID가 존재하지 않습니다."
        });
      //별점과 내용을 작성해야함.
      const { content, star } = req.body;
      if (!content || !star)
        return res.json({
          code: "NEED_REVIEW_DATA",
          message: "리뷰데이터가 존재하지 않습니다."
        })
      const alreadyReview = await Review.findAll({
        where: {
          beer_id: beer_id,
          user_id: req.token_data.id
        }
      });

      if (alreadyReview.length !== 0)
        return res.json({
          code: "ERROR_ALREADY_REVIEW",
          message: "이미 작성한 리뷰가 존재합니다."
        });
      const writeReview = await Review.create({
        beer_id: beer_id,
        user_id: req.token_data.id,
        content: content,
        star: star
      });

      if (!writeReview)
        res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });

      //리뷰 작성 후 맥주 정보 업데이트
      await reviewService.calcReviewData(beer_id);

      return res.json({
        message: "리뷰가 작성되었습니다",
        writeReview
      })
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}