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
};