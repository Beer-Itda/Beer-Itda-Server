var express = require('express');

const {
  Select
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

module.exports = {

  /* 최초 스타일,향 선택하기 */
  postFirstSelect: async (req, res) => {
    const user_id = req.body.id;
    const {
      style,
      aroma
    } = req.body;
    try {
      if (!user_id) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(responseMessage.NO_USER_ID));
      }
      //await styleService.postFirstSelect(user_id, style, aroma);
      await Select.create({
        id: user_id,
        style: style,
        aroma: aroma
      });
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },

  /* 스타일 수정 */
  modifySelectStyle: async (req, res) => {
    const user_id = req.body.id;
    const {
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
    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },


  /* 향 수정 */
  modifySelectAroma: async (req, res) => {
    const user_id = req.body.id;
    const {
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

    } catch (err) {
      console.log(err);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
    }
  },
}