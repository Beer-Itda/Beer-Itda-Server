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
      //Heart 테이블에서 동일한 heart 컬럼이 있다면 'Y' 보내기
      const isHeart = await Heart.findOne({
        where: {
          user_id: user_id,
          beer_id: beer_id
        }
      });
      if (isHeart) {
        //console.log('--------------', beer_id, 'Y');
        return 'Y'
      } else {
        //console.log('--------------', beer_id, 'N');
        return 'N'
      }
    } catch (err) {
      //console.log('--------------', beer_id);
      console.log(err);
      throw err;
    }
  },

  //가져온 beer_id값 value(Array)로 하트 눌렀는지 확인하고 배열 반영
  HeartArrayCheck: async ({
    user_id,
    value
  }) => {
    try {
      const heart = await Heart.findAll({
        attributes: ['beer_id'],
        where: {
          user_id: req.token_data.id,
          beer_id: {
            [Op.or]: value
          }
        },
      });

      const value = same_style_ids.map(x => x.dataValues.id);
      //원래 배열에서 heart가 있으면 true, 없으면 false반영 > 배열
      if (heart) {
        return 'Y'
      } else {
        return 'N'
      }
      const Array = value_list.split(',').map(Number);
      return Array
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};