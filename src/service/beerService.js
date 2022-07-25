const {
  Beer,
} = require('../../models');

module.exports = {
  //존재하는 맥주 아이디인지 확인
  BeerCheck: async ({
    beer_id
  }) => {
    try {
      //Beer 테이블에서 동일한 id가 있다면 1 보내기
      const isBeer = await Beer.findOne({
        where: {
          id: beer_id
        }
      });
      return !!isBeer;
    } catch (err) {
      console.log(err);
      throw err;
    }

  },
};