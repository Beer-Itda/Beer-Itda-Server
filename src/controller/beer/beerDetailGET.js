var express = require('express');

const {
  Beer,
  Style_Small,
  Aroma,
  Country,
  Select
} = require('../../../models');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');

//const beerService = require("../service/beerService");

module.exports = {
  // beer 세부사항 불러오기
  getBeerDetail: async (req, res) => {
    const id = req.params.id;
    try {
      const beers = await Beer.findOne({
        attributes: ['k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery',
          'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4',
          'style_id', 'country_id'
        ],
        where: {
          id: id,
        }
      });

      const result = {};

      result.k_name = beers.k_name;
      result.e_name = beers.e_name;
      result.abv = beers.abv;
      result.star_avg = beers.star_avg;
      result.thumbnail_image = beers.thumbnail_image;
      result.brewery = beers.brewery;

      const aroma_id_1 = beers.aroma_id_1;
      const aroma_id_2 = beers.aroma_id_2;
      const aroma_id_3 = beers.aroma_id_3;
      const aroma_id_4 = beers.aroma_id_4;
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

      // 향 불러오기 
      result.aroma = {};

      const aroma1 = await Aroma.findOne({
        attributes: ['aroma'],
        where: {
          id: aroma_id_1,
        }
      });
      result.aroma.a1 = aroma1.aroma;

      if (aroma_id_2) {
        const aroma2 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_2,
          }
        });
        result.aroma.a2 = aroma2.aroma;
      }

      if (aroma_id_3) {
        const aroma3 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_3,
          }
        });
        result.aroma.a3 = aroma3.aroma;
      }

      if (aroma_id_4) {
        const aroma4 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_4,
          }
        });
        result.aroma.a4 = aroma4.aroma;
      }

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};