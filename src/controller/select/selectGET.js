const {
  Select,
} = require('../../../models');

const selectService = require('../../service/selectService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');


module.exports = {
  /**
 * @선택한_정보_불러오기
 * @desc 선택한 스타일,향 불러오기
 */
  getSelect: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const alreadySelect = await selectService.FirstSelectCheck({
        user_id,
      });
      if (alreadySelect === 'selected') {
        return res.status(statusCode.CONFLICT).send({
          message : "이미 선택 하셨습니다"
        });
      }
      const select = await Select.findOne({
        attribute: ['id', 'style', 'aroma'],
        where: {
          user_id: user_id
        }
      });
      const result = {};
      result.select = select;
      return res.status(statusCode.OK).send(util.success(responseMessage.SELECT_INFO_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  }
}