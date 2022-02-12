const { Review, Beer, User } = require("../../models");
const statusCode = require("../../modules/statusCode");
const levelService = require("./levelService");

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
      }
      //맥주 star 평균 계산
      const star_avg = reviewStarAddAll / reviewDataByBeer.length;

      //해당 맥주 데이터 업데이트  
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
  },
  user_review_calc: async(review_count_status, req, res) => {
    try{
      const user = await User.findOne({where: {
        id: req.token_data.id
        }, raw: true});
      if(!user)
        res.status(statusCode.CONFLICT).json({
          code: "USER_INFO_ERROR",
          message: "USER 정보를 불러오는데 실패하였습니다."
        });
      let update_user_level_id;
      if(review_count_status === 'ADD'){
       user.review_count++;
       update_user_level_id = await levelService.calc_user_review_level(user.review_count);
       user.level_id = update_user_level_id;
      }
      if(review_count_status === 'REMOVE'){
       user.review_count--;
       update_user_level_id = await levelService.calc_user_review_level(user.review_count);
       user.level_id = update_user_level_id;
      }
    } catch(error){
      console.log(error);
      return res.json(error);
    }
  }
}