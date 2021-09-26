var express = require('express');

const {
  Beer,
  Style_Big,
  Style_Mid,
  Style_Small,
  Aroma,
  Country,
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

  // beer 세부사항 불러오기
  getOneBeer: async (req, res) => {
    const id = req.params.id;
    try {
      const beers = await Beer.findOne({
        attributes: ['k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery', 'aroma_id', 'style_id', 'country_id']
      });

      const result = {};

      result.k_name = beers.k_name;
      result.e_name = beers.e_name;
      result.abv = beers.abv;
      result.star_avg = beers.star_avg;
      result.thumbnail_image = beers.thumbnail_image;
      result.brewery = beers.brewery;

      const aroma_id_1 = beers.aroma_id;
      const style_id = beers.style_id;
      const country_id = beers.country_id;

      // 제조국가 불러오기 
      const countrys = await Country.findOne({
        attributes: ['country'],
        where: {
          id: country_id,
        }
      });
      result.country = countrys.country;

      // 스타일 불러오기 
      const styles = await Style_Small.findOne({
        attributes: ['small_name'],
        where: {
          id: style_id,
        }
      });
      result.style = styles.small_name;

      // 스타일1 불러오기 
      const aroma1 = await Aroma.findOne({
        attributes: ['aroma'],
        where: {
          id: aroma_id_1,
        }
      });
      result.aroma = {};
      result.aroma.a1 = aroma1.aroma;

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