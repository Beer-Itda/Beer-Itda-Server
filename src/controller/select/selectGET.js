var express = require('express');

const {
  Select,
  Aroma,
  Style
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

module.exports = {
  /* 기존에 선택한 Aroma 불러오기*/
  getSelectedAroma: async (req, res) => {
    res.send('기존에 선택한 Aroma 불러오기');
  },

  /* 기존에 선택한 Style 불러오기*/
  getSelectedStyle: async (req, res) => {
    res.send('기존에 선택한 Style 불러오기');
  },

}