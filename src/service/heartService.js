const {
  Heart,
} = require('../../models');

module.exports = {
  //하트 눌렀는지 확인
  HeartCheck: async ({
    user_id,
    beer_id
  }) => {
    try {
      //Heart 테이블에서 동일한 heart 컬럼이 있다면 true 보내기
      const isHeart = await Heart.findOne({
        where: {
          user_id: user_id,
          beer_id: beer_id
        }
      });
      if (isHeart) {
        return 'Y'
      } else {
        return 'N'
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};