const selectService = require('../../service/selectService');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

/**
 * @전체_향_불러오기
 * @desc 향 관련 리스트 전체 불러오기(내가 선택한 향 확인)
 */
module.exports = {
  getAllAromaList: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const value = 'aroma';
      const selected_ids = await selectService.ChangeSelectArray({
        user_id, value
      });
      const select_list = await selectService.GetSelectList({ 
        value, selected_ids
      });
      const aroma_list = await selectService.mergeData({ 
        value, select_list
      });
      const temp_aroma_list = aroma_list.splice(8,1);
      aroma_list.unshift(temp_aroma_list[0])

      return res.status(statusCode.OK).json({data: aroma_list});
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.AROMA_INFO_FAIL));
    }
  }
};