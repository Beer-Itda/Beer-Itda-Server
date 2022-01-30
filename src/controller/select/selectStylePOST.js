const { Select } = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const selectService = require('../../service/selectService');

module.exports = {

  /**
 * @좋아하는_스타일_선택하기
 * @desc 좋아하는 스타일 선택하기
 */
  postStyle: async (req, res) => {
    const user_id = req.token_data.id;
    const { style_ids } = req.body;
    if (!style_ids) {
      return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SELECT_INFO_FAIL));
    };

    var rm = '최초선택인지 수정인지 확인하는 메시지';

    try {
      //1. Select 테이블에 user_id가 있는지 확인
      const alreadySelect = await selectService.FirstSelectCheck({
        user_id,
      });
      if (alreadySelect == 'first') {
        //select한적이 없으므로 create
        await Select.create({
          style: style_ids,
          aroma: aroma_ids,
          user_id: user_id
        });
        rm = '스타일 최초선택에 성공했습니다';
      }
      if (alreadySelect == 'selected') {
        //이미 select한적이 있으므로 update
        await Select.update({
          style: style_ids,
        }, {
          where: {
            user_id: user_id
          },
        });
        rm = '스타일 수정에 성공했습니다';
      }

      const select = await Select.findOne({
        attributes: ['style'],
        where: {
          user_id: user_id
        }
      });

      const result = select;
      return res.status(statusCode.OK).send(util.success(rm, result));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
}