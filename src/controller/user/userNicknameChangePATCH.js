const { User } = require('../../../models');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  userNicknameChange: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.token_data.id
        }
      });

      if (!user)
        res.json({
          message: "존재하지 않는 유저 입니다."
        });
      user.nickname = req.body.nickname;
      await user.save({ fields: ['nickname'] });

      return res.json({
        message: "닉네임이 변경되었습니다",
        user
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
};