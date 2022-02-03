const { Level, User } = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * @등급_정보_전체_불러오기
 * @desc 전체 등급 정보 불러오기
 */
module.exports = {
  getLevelListAll: async (req, res) => {
    const user_id = req.token_data.id;
    try {
      const levels = await Level.findAll({});

      const user1 = await User.findOne({
        attributes: ['review_count', 'level_id'],
        where: {
          id: user_id
        }
      });

      const user_next_level_id = user1.level_id + 1;
      
      const user_level = await Level.findOne({
        attributes: ['level'],
        where: {
          id: user1.level_id
        }
      });

      const next_level = await Level.findOne({
        attributes: ['level', 'level_count'],
        where: {
          id: user_next_level_id
        }
      });

      //next_level.level_count: 유저의 다음 레벨에 정해진 리뷰 개수
      //user.review_count: 현재 유저가 작성한 리뷰 개수
      //user_count: 다음 레벨까지 남은 리뷰 개수
      const user_count = next_level.level_count - user1.review_count;

      const user = {};
      user.level = user_level.level;
      user.count = user_count;
      user.nextLevel = next_level.level;

      const result = {};
      result.user = user;
      result.levels = levels;
      return res.status(statusCode.OK).send(util.success(responseMessage.LEVEL_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LEVEL_READ_ALL_FAIL));
    }
  }
};