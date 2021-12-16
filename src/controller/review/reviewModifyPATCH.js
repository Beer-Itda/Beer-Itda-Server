const { Review } = require("../../../models")

module.exports = {
  //내가 작성한 리뷰를 수정한다.
  modifyMyReview: async (req, res) => {
    try {
      const beer_id = parseInt(req.params.beer_id);

      if (!beer_id)
        return res.json({
          code: "NEED_BEER_ID",
          message: "BEER ID가 존재하지 않습니다."
        });
      //토큰 데이터로 리뷰 테이블의 내 리뷰를 찾는다.
      //파라미터로 함께 찾는다.
      const my_review = await Review.update({
        content: req.body.content,
        star: req.body.star
      }, {
        where: {
          user_id: req.token_data.id,
          beer_id: req.params.beer_id
        }
      });
      //수정할 내용을 작성하고 없으면 없다고 작성한다. 
      //별점도 수정해 준다.
      //저장하고 출력한다.
      if (!my_review)
        res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });

      return res.json({
        message: "리뷰가 수정되었습니다."
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
}