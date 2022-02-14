const { Beer, Style_Small, Aroma, Country, Review } = require('../../../models');

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
    const beer_id = parseInt(req.params.id);
    const user_id = req.token_data.id;

    const result = {};

    try {
      // 맥주정보 불러오기
      const beer_detail = {};
      const beers = await Beer.findOne({
        attributes: ['id', 'k_name', 'e_name', 'abv', 'star_avg', 'thumbnail_image', 'brewery',
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
      beer_detail.heart = (alreadyHeart === 'Y');
      beer_detail.id = beers.id;
      beer_detail.k_name = beers.k_name;
      beer_detail.e_name = beers.e_name;
      beer_detail.abv = beers.abv;
      beer_detail.star_avg = beers.star_avg;
      beer_detail.thumbnail_image = beers.thumbnail_image;
      beer_detail.brewery = beers.brewery;

      const aroma_id_1 = beers.aroma_id_1;
      const aroma_id_2 = beers.aroma_id_2;
      const aroma_id_3 = beers.aroma_id_3;
      const aroma_id_4 = beers.aroma_id_4;
      const style_id = beers.style_id;
      const country_id = beers.country_id;
      
      // 제조국가 불러오기 
      const country = await Country.findOne({
        attributes: ['country'],
        where: {
          id: country_id,
        }
      });
      beer_detail.country = country.country;

      // 스타일 불러오기 
      const styles = await Style_Small.findOne({
        attributes: ['small_name'],
        where: {
          id: style_id,
        }
      });
      beer_detail.style = styles.small_name;
      // 향 불러오기
      beer_detail.aroma = {};

      const aroma1 = await Aroma.findOne({
        attributes: ['aroma'],
        where: {
          id: aroma_id_1,
        }
      });
      beer_detail.aroma.a1 = aroma1.aroma;

      if (aroma_id_2) {
        const aroma2 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_2,
          }
        });
        beer_detail.aroma.a2 = aroma2.aroma;
      } else {
        beer_detail.aroma.a2 = 0;
      }

      if (aroma_id_3) {
        const aroma3 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_3,
          }
        });
        beer_detail.aroma.a3 = aroma3.aroma;
      } else {
        beer_detail.aroma.a3 = 0;
      }

      if (aroma_id_4) {
        const aroma4 = await Aroma.findOne({
          attributes: ['aroma'],
          where: {
            id: aroma_id_4,
          }
        });
        beer_detail.aroma.a4 = aroma4.aroma;
      } else {
        beer_detail.aroma.a4 = 0;
      }

      result.beer = beer_detail;

      // 스타일이 같은 맥주 불러오기 (5개)
      const same_style_beers = await Beer.findAll({
        attributes: ['id', 'k_name', 'e_name', 'star_avg', 'thumbnail_image'],
        where: {
          style_id: style_id
        },
        limit: 5,
      });

      /**
       * style 에 맞는 맥주 아이디만 받아서 배열로 가져오기
       * heartCheck 후 결과 배열만 가져오기 [{"heart": true}, ...] 형식으루!
       * same_style_beers, heart Array map 하기
       * */
      const same_style_beers_ids = await Beer.findAll({
        attributes: ['id'],
        where: {
          style_id: style_id
        },
        limit: 5,
      });

      const value = same_style_beers_ids.map(x => x.dataValues.id); //[ 2, 11, 43, 111, 141 ]

      const heart_list1 = []; //[ { heart: true }, ... ]
      const heart_list2 = []; //[ true, true, false, false, false ]
      for (let i in value) {
        const beer_id = value[i];
        const alreadyHeart = await heartService.HeartCheck({
          user_id,
          beer_id
        });
        if (alreadyHeart === 'Y') {
          heart_list1.push({
            "heart": true
          });
          heart_list2.push(true);
        }
        if (alreadyHeart === 'N') {
          heart_list1.push({
            "heart": false
          });
          heart_list2.push(false);
        }
      }

      function mergeObj(obj1, obj2) {
        const newObj = [];
        for (let i in obj1) {
          newObj[i] = obj1[i];
        }
        for (let i in obj2) {
          newObj[i].dataValues.heart = obj2[i];
        }
        return newObj;
      }
      result.same_style_beers = mergeObj(same_style_beers, heart_list2);

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
      /**
       * aroma 에 맞는 맥주 아이디만 받아서 배열로 가져오기
       * heartCheck 후 결과 배열만 가져오기 [true,false, ...] 형식으루!
       * same_aroma_beers, heart Array map 하기
       * */
      const same_aroma_beers_ids = await Beer.findAll({
        attributes: ['id'],
        where: {
          [Op.or]: {
            aroma_id_1: aroma_id_1,
            aroma_id_2: aroma_id_1,
          }
        },
        limit: 5,
      });

      const value2 = same_aroma_beers_ids.map(x => x.dataValues.id); //[ 2, 11, 43, 111, 141 ]

      const heart_list3 = [];
      for (let i in value2) {
        const beer_id = value2[i];
        const alreadyHeart = await heartService.HeartCheck({
          user_id,
          beer_id
        });
        if (alreadyHeart === 'Y') {
          heart_list3.push(true);
        }
        if (alreadyHeart === 'N') {
          heart_list3.push(false);
        }
      }
      result.same_aroma_beers = mergeObj(same_aroma_beers, heart_list3);
      // 내가 쓴 리뷰 있으면 불러오고 없으면 넘어가기
      // 맥주에 대한 리뷰 5개 이하 간단히 불러오기
      const userReview = await Review.findOne({
        where: {
          user_id: user_id,
          beer_id: beer_id
        }
      });
      result.review = {};

      result.review.user_review = !userReview ? [] : userReview;
      // if (!userReview) {
      //   result.review.userReview = [];
      // } else {
      //   result.review.userReview = userReview;
      // }
      const beerReviews = await Review.findAll({
        where: {
          beer_id: beer_id
        },
        limit: 5,
      });

      result.review.beer_reivew = !beerReviews ? [] : beerReviews;
      // if (!beerReviews) {
      //   result.review.beerReviews = [];
      // } else {
      //   result.review.beerReviews = beerReviews;
      // }

      return res.status(statusCode.OK).send(util.success(responseMessage.BEER_OK, result));
    } catch (error) {
      console.error(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BEER_READ_ALL_FAIL));
    }
  },
};