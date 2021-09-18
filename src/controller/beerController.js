var express = require('express');

const {
  Beer
} = require('../../models');

const util = require('../../modules/util');
const statusCode = require('../../modules/statusCode');
const responseMessage = require('../../modules/responseMessage');

const beerService = require("../service/beerService");

module.exports = {
  // beerController 연결확인
  getCheckBeer: async (req, res) => {
    res.send('으랏챠 beer page 연결');
  },
  // 전체 beer 불러오기(페이징 안됨)
  getAllBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image']
      });
      const result = {};
      result.beers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  // 이달의 beer 불러오기(1개)
  getMonthlyBeer: async (req, res) => {
    try {
      const beers = await Beer.findOne({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image']
      });
      const result = {};
      result.beers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  // 좋아하는 스타일 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllStyleBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image']
      });
      //좋아하는 스타일 불러오는 로직
      const result = {};
      result.Stylebeers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },

  // 좋아하는 향 beer 전체 불러오기(페이징 안됨) [전체보기 기준, id값 정렬할 것]
  getAllAromaBeer: async (req, res) => {
    try {
      const beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image']
      });
      //좋아하는 스타일 불러오는 로직
      const result = {};
      result.Stylebeers = beers;
      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};