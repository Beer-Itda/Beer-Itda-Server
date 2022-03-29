var express = require('express');

const {
  Select,
  User
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

const selectService = require('../../service/selectService');

module.exports = {
  //1. Select 테이블에 user_id가 있는지 확인(service)
  //1-1. user_id가 없다면 생성(create table)
  //1-2. user_id가 있다면 수정(update table)


  /* 스타일,향 선택하기 */
  postSelect: async (req, res) => {
    const {
      style_ids,
      aroma_ids
    } = req.body;

    const user_id = req.token_data.id;

    var rm = '최초선택인지 수정인지 확인하는 메시지';

    try {
      //1. Select 테이블에 user_id가 있는지 확인
      const alreadySelect = await selectService.FirstSelectCheck({
        user_id,
      });
      if (alreadySelect === 'first') {
        //select 한적이 없으므로 create
        await Select.create({
          style: style_ids,
          aroma: aroma_ids,
          user_id: user_id
        });
        rm = '향, 스타일 최초선택에 성공했습니다';

      }
      if (alreadySelect === 'selected') {
        //이미 select 한적이 있으므로 update
        await Select.update({
          style: style_ids,
          aroma: aroma_ids,
        }, {
          where: {
            user_id: user_id
          },
        });
        rm = '향, 스타일 수정에 성공했습니다';
      }

      const select = await Select.findOne({
        attribute: ['id', 'style', 'aroma'],
        where: {
          user_id: user_id
        }
      });

      const result = {};
      result.select = select;
      return res.status(statusCode.OK).send(util.success(rm, result));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /* 연결확인 */
  getCheckSelect: async (req, res) => {
    res.send('으랏챠 user page 연결');
  },
}