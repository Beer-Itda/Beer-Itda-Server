const { Select, Style, Aroma} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const selectService = require('../../service/selectService');

module.exports = {

  /**
 * @좋아하는_향_선택하기
 * @desc 좋아하는 향 선택하기
 */
  postAroma: async (req, res) => {
    const user_id = req.token_data.id;
    let { aroma_ids } = req.body;
    if (!aroma_ids) {
      return res.status(statusCode.BAD_REQUEST).send({
        message: responseMessage.SELECT_INFO_FAIL
      });
    }
    try {
      //TODO - 그냥 저는 미친놈입니다
      if(aroma_ids.includes(999)){
        const aromaAllData = await Aroma.findAll({
          attributes: ['id'],
          raw: true
        })
        const aroma_999 = aromaAllData.map(item => item.id)
        if(aroma_ids.length > 1){
          for(let i = 0; i < aroma_ids.length; i++){
            for(let j = 0; j < aroma_999.length; j++){
              if(aroma_ids[i] === aroma_999[j]){
                aroma_999.splice(j, 1);
                j--;
              }
            }
          }
          aroma_999.push(999);
          aroma_ids = aroma_999;
        }
        aroma_ids = aroma_999;
      }
      //1. Select 테이블에 user_id가 있는지 확인
      const alreadySelect = await selectService.FirstSelectCheck({
        user_id,
      });
      if (alreadySelect === 'first') {
        //select 한적이 없으므로 create
        await Select.create({
          aroma: aroma_ids.toString(),
          user_id: user_id
        });
      }
      if (alreadySelect === 'selected') {
        //이미 select 한적이 있으므로 update
        await Select.update({
          aroma: aroma_ids.toString(),
        }, {
          where: {
            user_id: user_id
          },
        });
      }
      const result = await Select.findOne({
        attributes: ['aroma'],
        where: {
          user_id: user_id
        }
      });
      return res.status(statusCode.OK).send({
        aroma : result.aroma.split(',').map(Number)
      });
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
}