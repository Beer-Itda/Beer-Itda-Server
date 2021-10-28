const {
  Select
} = require('../models');

module.exports = {
  //맨 처음 스타일, 향 설정
  postFirstSelect: async (user_id, style, aroma) => {
    try {
      const first_select = await Style.create({
        user_id,
        style,
        aroma
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};