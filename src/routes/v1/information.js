const express = require('express');
const router = express.Router();
const jwt_module = require('../../../modules/jwt');

const styleListAllGET = require('../../controller/information/styleListAllGET');
const aromaListAllGET = require('../../controller/information/aromaListAllGET');
const tosContentGET = require('../../controller/information/tosContentGET');
const searchBeerBreweryGET = require('../../controller/information/searchBeerBreweryGET');

/* GET users listing. */
router.get('/style', styleListAllGET.getAllStyleList);
router.get('/aroma', aromaListAllGET.getAllAromaList);

//공지사항,이용 약관, 개인정보처리방침 관련
router.get('/ToS/:content', jwt_module.checkAuth, tosContentGET.getEachContent);

//검색 관련
router.get('/search', jwt_module.checkAuth, searchBeerBreweryGET.searchEveryBeerBrewery);

module.exports = router;