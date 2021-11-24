var express = require('express');

const {
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  //1. Select 테이블에 userId가 있는지 확인
  //1-1. userId가 없다면 생성(create table)
  //1-2. userId가 있다면 수정(modify table)


  /* 최초 스타일,향 선택하기 */
  postFirstSelect: async (req, res) => {
    const {
      userId,
      styleIds,
      aromaIds
    } = req.body;
    try {
      //style
      //const valuesString = userIds.map(styleIds => `(${user_id}, ${styleIds})`).join(',');

      //유저 가입할 때 select 테이블도 같이 생성하면 안될까....?
      const select_user = await Select.create({
        user_id: userId,
        style: styleIds,
        aroma: aromaIds,
      });

      const result = {};
      result.select_user = select_user;
      return res.status(statusCode.OK).send(util.success(responseMessage.SELECT_AROMA_OK, result));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /*스타일, 향 수정 */
  modifySelect: async (req, res) => {
    const {
      userId,
      style
    } = req.body;
    try {
      await Select.update({
        style: style,
      }, {
        where: {
          userId: userId
        },
      });
      return res.status(statusCode.OK).send(util.success(responseMessage.MODIFY_STYLE_OK));
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