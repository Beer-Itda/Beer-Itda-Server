const { Review } = require("../../../models")

module.exports = {
  //나의 페이지에서 내가 작성한 모든 리뷰를 불러온다.
  readMyReviewList: async (req, res) => {
    try {
      //토큰 데이터를 이용하여 리뷰 테이블에서 검색한다.
      const my_review = await Review.findAll({
        where: {
          user_id: req.token_data.id
        },
        raw: true
      });

      //없으면 없다.
      if (!my_review)
        return res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });

      //출력된 데이터 모두를 시간 내림 차순으로 출력한다.
      return res.json(my_review);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
};