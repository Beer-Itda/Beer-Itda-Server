const { Level, User } = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
/**
 * @등급_정보_전체_불러오기
 * @desc 전체 등급 정보 불러오기
 */
module.exports = {
  getLevelListAll: async (req, res) => {
    const user_id = req.token_data.id;
    try {
      //level 전체
      const levels = await Level.findAll({raw: true});
      //user 데이터
      const user = await User.findOne({
        attributes: ['review_count', 'level_id'],
        where: {
          id: user_id
        }, raw: true
      });
      //유저 레벨
      const user_current_level = await Level.findOne({
        attributes: ['id', 'level', 'level_count'],
        where: {
          id: user.level_id
        }, raw: true
      });
      //유저 다음 레벨 계산
      const next_level_data = levels.find(level_data => level_data.id === user.level_id + 1);
      //남은 리뷰 갯수 계산
      const need_review_count = next_level_data.level_count - user.review_count;
      //current_level - 유저 현재 레벨
      //need_review_count - 다음 리뷰까지 필요한 리뷰 갯수
      //next_level - 유저 다음 레벨
      const user_result_data = {};
      user_result_data.current_level = user_current_level.level;
      user_result_data.need_review_count = need_review_count;
      user_result_data.next_level = next_level_data.level;

      const result = {};
      result.user = user_result_data;
      result.levels = levels;
      return res.status(statusCode.OK).send(util.success(responseMessage.LEVEL_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.LEVEL_READ_ALL_FAIL));
    }
  }
};