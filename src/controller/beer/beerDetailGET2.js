var express = require('express');

const {
  Beer,
  Style_Small,
  Aroma,
  Country,
  Heart
} = require('../../../models');

//const beerService = require("../service/beerService");
const heartService = require('../../service/heartService');

const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  // beer 세부사항 불러오기
  getBeerDetail: async (req, res) => {
    const beer_id = req.params.id;
    const user_id = req.token_data.id;

    const result = {};

    try {
      // 맥주정보 불러오기
      const beers = await Beer.findOne({
        attributes: ['k_name', 'e_name', 'star_avg', 'thumbnail_image', 'brewery',
          'aroma_id_1', 'aroma_id_2', 'aroma_id_3', 'aroma_id_4',
          'style_id', 'country_id'
        ],
        where: {
          id: beer_id,
        },
      });

      // 찜 여부
      const alreadyHeart = await heartService.HeartCheck({
        user_id,
        beer_id,
      });
      if (alreadyHeart == 'Y') {
        result.heart = true;
      } else {
        result.heart = false;
      }

      result.beer_detail = {};
      result.beer_detail.k_name = beers.k_name;
      result.beer_detail.e_name = beers.e_name;
      result.beer_detail.abv = beers.abv;
      result.beer_detail.star_avg = beers.star_avg;
      result.beer_detail.thumbnail_image = beers.thumbnail_image;
      result.beer_detail.brewery = beers.brewery;

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
      result.beer_detail.country = countrys.country;

      // 스타일 불러오기 
      const styles = await Style_Small.findOne({
        attributes: ['small_name'],
        where: {
          id: style_id,
        }
      });
      result.beer_detail.style = styles.small_name;

      // 향 불러오기
      result.beer_detail.aroma = {};

      const aroma1 = await Aroma.findOne({
        attributes: ['aroma'],
        where: {
          id: aroma_id_1,
        }
      });
      result.beer_detail.aroma.a1 = aroma1.aroma;

      if (aroma_id_2) {
        const aroma2 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_2,
          }
        });
        result.beer_detail.aroma.a2 = aroma2.aroma;
      } else {
        result.beer_detail.aroma.a2 = 0;
      }

      if (aroma_id_3) {
        const aroma3 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_3,
          }
        });
        result.beer_detail.aroma.a3 = aroma3.aroma;
      } else {
        result.beer_detail.aroma.a3 = 0;
      }

      if (aroma_id_4) {
        const aroma4 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_4,
          }
        });
        result.beer_detail.aroma.a4 = aroma4.aroma;
      } else {
        result.beer_detail.aroma.a4 = 0;
      }
      //
      // 스타일이 같은 맥주 불러오기 (5개)
      const same_style_beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'],
        where: {
          style_id: style_id
        },
        /*
        include: [{
          model: Heart,
          as: 'heart',
          where: {
            user_id: user_id,
            beer_id: Sequelize.col('beer.id')
          }
        }],
        */
        limit: 5,
      });

      //style에 맞는 맥주 아이디만 받아서 배열로 가져오기
      /*
            const value = same_style_beers.id;
            const heartstyleArray = await heartService.ChangeValueToArray({
              user_id,
              value
            });
            if (!heartstyleArray) {
              return res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, responseMessage.SELECT_INFO_FAIL));
            };
      */
      /*
            const value_list = {}
            value_list = same_style_beers.dataValues.id;
            const Array = value_list.split(',').map(Number);
            console.log('---------------------', Array);
      */
      const heart = await Heart.findAll({
        attributes: ['beer_id'],
        where: {
          user_id: req.token_data.id,
        },
      });

      function GetheartList(heart) {
        if (heart.beer_id == true) {
          return heart.beer_id;
        }
      }
      result.heart_list = heart.filter(GetheartList);


      //heart 테이블 include
      //same_style_beers, heart map




      // 향이 같은 맥주 불러오기 (5개)
      const same_aroma_beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'],
        where: {
          [Op.or]: {
            aroma_id_1: aroma_id_1,
            aroma_id_2: aroma_id_1,
          }

        },
        limit: 5,
      });

      result.same_style_beers = same_style_beers;
      result.same_aroma_beers = same_aroma_beers;


      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};