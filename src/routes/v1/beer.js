const express = require('express');
const beerAllGET = require('../../controller/beer/beerAllGET');
const beerChoiceAromaGET = require('../../controller/beer/beerChoiceAromaGET');
const beerChoiceStyleGET = require('../../controller/beer/beerChoiceStyleGET');
const beerDetailGET = require('../../controller/beer/beerDetailGET');
const beerMonthlyGET = require('../../controller/beer/beerMonthlyGET');
const beerRandomGET = require('../../controller/beer/beerRandomGET');
const beerHeartGET = require('../../controller/beer/beerHeartGET');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

//맥주 전체 정보 불러오기
router.get('/', jwtModule.checkAuth, beerAllGET.getAllBeer);

//맥주 상세 정보 불러오기
router.get('/detail/:id', jwtModule.checkAuth, beerDetailGET.getBeerDetail);

//이달의 맥주 정보 불러오기
router.get('/monthly', beerMonthlyGET.getMonthlyBeer);

//맥주 랜덤 정보 불러오기 (이런 맥주는 어떠세요?)
router.get('/random', jwtModule.checkAuth, beerRandomGET.getRandomBeer);

//맥주 스타일별 정보 불러오기 (회원님이 좋아하는 스타일)
router.get('/style', jwtModule.checkAuth, beerChoiceStyleGET.getAllStyleBeer);

//맥주 향별 정보 불러오기 (회원님이 좋아하는 향)
router.get('/aroma', jwtModule.checkAuth, beerChoiceAromaGET.getAllAromaBeer);

//찜한 맥주 정보 불러오기 (마이페이지_찜한 맥주)
router.get('/heart', jwtModule.checkAuth, beerHeartGET.getAllHeartBeer);

module.exports = router;