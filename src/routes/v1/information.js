const express = require('express');
const router = express.Router();
const jwt_module = require('../../../modules/jwt');

const styleListAllGET = require('../../controller/information/styleListAllGET');
const aromaListAllGET = require('../../controller/information/aromaListAllGET');
const tosContentGET = require('../../controller/information/tosContentGET');
const searchBeerBreweryGET = require('../../controller/information/searchBeerBreweryGET');

//모든 스타일과 향 정보 불러오기
router.get('/style', jwt_module.checkAuth, styleListAllGET.getAllStyleList);
router.get('/aroma', jwt_module.checkAuth, aromaListAllGET.getAllAromaList);

//공지사항,이용 약관, 개인정보처리방침 관련
router.get('/ToS/:content', jwt_module.checkAuth, tosContentGET.getEachContent);

//검색 관련
router.get('/search', jwt_module.checkAuth, searchBeerBreweryGET.searchEveryBeerBrewery);

module.exports = router;