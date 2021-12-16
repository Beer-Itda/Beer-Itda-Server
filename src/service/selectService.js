const {
  Select
} = require('../../models');

module.exports = {
  //맨 처음 스타일, 향 설정
  FirstSelectCheck: async ({
    user_id
  }) => {
    try {
      //있으면 첫 선택이 아님
      const alreadySelect = await Select.findOne({
        where: {
          user_id: user_id,
        }
      });
      if (alreadySelect) {
        return 'selected'
      }
      return 'first';
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //select한 style, aroma을 배열로 바꿔주기 (여기서 value는 style, aroma 값 중 1)
  ChangeSelectArray: async ({
    user_id,
    value
  }) => {
    try {
      const select = await Select.findOne({
        attribute: ['id', 'style', 'aroma'],
        where: {
          user_id: user_id,
        }
      });

      //값을 배열로 바꾸는 로직
      if (value == 'style') {
        const select_value = select.dataValues.style;
        const selectArray = select_value.split(',').map(Number);
        return selectArray
      }
      if (value == 'aroma') {
        const select_value = select.dataValues.aroma;
        const selectArray = select_value.split(',').map(Number);
        return selectArray
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};