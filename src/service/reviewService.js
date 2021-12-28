const { reviewService } = require(".");
const { Review, Beer } = require("../../models");

module.exports = {
  calcReviewData: async (beer_id, res) => {
    try {
      //beer_id 로 리뷰 테이블 검색
      const reviewDataByBeer = await Review.findAll({
        where: {
          beer_id: beer_id
        },
        raw: true
      });
      //예외 처리
      if (!reviewDataByBeer)
        return res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });

      let reviewStarAddAll = 0;
      //맥주 star 합 계산
      for (let i = 0; i < reviewDataByBeer.length; i++) {
        reviewStarAddAll += reviewDataByBeer[i].star;
      };
      //맥주 star 평균 계산
      const star_avg = reviewStarAddAll / reviewDataByBeer.length;

      //해당 맥주 데이터에 입력  
      await Beer.update({
        star_avg: star_avg,
        review_count: reviewDataByBeer.length
      }, {
        where: {
          id: beer_id
        }
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }



  //Beer에 별점 평균과 리뷰갯수 전송
  //저장

}