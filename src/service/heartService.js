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

  //찜한 맥주 아이디 목록 배열로 반환
  ChangeHeartArray: async ({
    user_id,
  }) => {
    try {
      const heart = await Heart.findAll({
        attributes: ['beer_id'],
        where: {
          user_id: user_id,
        },
      });

      //비어 아이디를 배열로 만들기
      const heart_beer_ids = heart.map(x => x.dataValues.beer_id)

      return heart_beer_ids;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //맥주 데이터에 하트 여부 추가하기
  MergeHeart: async ({
    user_id, obj1, obj2
  }) => {
    try {
      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) {
          newObj[i] = obj1[i];
        }
        for (let i in obj2) {
          newObj[i].dataValues.heart = obj2[i];
        }
        return newObj;
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};