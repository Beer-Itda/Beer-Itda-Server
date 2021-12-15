var express = require('express');

const {
  Select,
} = require('../../../models');

const selectService = require('../../service/selectService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');


module.exports = {
  //1. Select 테이블에 user_id가 있는지 확인(serivce)
  //2. user_id가 있다면 불러오기

  /* 기존에 선택한 향, 스타일 불러오기*/
  getSelect: async (req, res) => {
    const user_id = req.token_data.id;

    try {
      const alreadySelect = await selectService.FirstSelectCheck({
        user_id,
      });
      if (!alreadySelect == 'selected') {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
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
  },

  /* 기존에 선택한 스타일 불러오기*/
  getSelectStyle: async (req, res) => {
    const user_id = req.token_data.id;
    try {
      //배열로만들고
      //[:]로 불러오기
      const value = 'style';
      const styleArray = await selectService.ChangeSelectArray({
        user_id,
        value
      });
      if (!styleArray) {
        return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
      };

      const result = {};
      result.style = styleArray;

      return res.status(statusCode.OK).send(util.success(responseMessage.SELECT_INFO_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  /* 기존에 선택한 Style 불러오기*/
  getSelectCheck: async (req, res) => {
    res.send('기존에 선택한 Style, Aroma 불러오기');
  }
}