const selectService = require('../../service/selectService');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

module.exports = {
  /**
 * @전체_스타일_불러오기
 * @desc 스타일 관련 리스트 전체 불러오기(내가 선택한 스타일 확인)
 */
  getAllStyleList: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const value = 'style';
      const selected_ids = await selectService.ChangeSelectArray({
        user_id, value
      });
      const select_list = await selectService.GetSelectList({ 
        value, selected_ids
      });
      const style_list = await selectService.mergeData({ 
        value, select_list
      });

      const result = {};
      result.style_list = style_list;

      return res.status(statusCode.OK).send(util.success(responseMessage.STYLE_INFO_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
    }
  }
};