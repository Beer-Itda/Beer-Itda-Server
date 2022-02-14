const { Level, User } = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const levelService = require("../../service/levelService");
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
      //user 정보를 바탕으로 review 와 level 데이터 출력
      const user_result_data = await levelService.calc_user_review_and_level(user_id);
      //최종 출력 데이터
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