var express = require('express');

const {
  Select
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

module.exports = {
  /* 연결확인 */
  getCheckSelect: async (req, res) => {
    res.send('으랏챠 user page 연결');
  },


  /* 최초 스타일,향 선택하기 */
  postFirstSelect: async (req, res) => {
    const {
      user_id,
      style,
      aroma
    } = req.body;
    try {
      const select_user = await Select.create({
        id: user_id,
        style: style,
        aroma: aroma
      });
      const result = {};
      result.select_user = select_user;
      return res.status(statusCode.OK).send(util.success(responseMessage.SELECT_AROMA_OK, result));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /* 스타일 수정 */
  modifySelectStyle: async (req, res) => {
    const {
      user_id,
      style
    } = req.body;
    try {
      await Select.update({
        style: style,
      }, {
        where: {
          id: user_id
        },
      });
      return res.status(statusCode.OK).send(util.success(responseMessage.MODIFY_STYLE_OK));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },


  /* 향 수정 */
  modifySelectAroma: async (req, res) => {
    const {
      user_id,
      aroma
    } = req.body;
    try {
      await Select.update({
        aroma: aroma,
      }, {
        where: {
          id: user_id
        },
      });
      return res.status(statusCode.OK).send(util.success(responseMessage.MODIFY_AROMA_OK));
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
}