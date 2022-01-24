const express = require('express');
const beerAllGET = require('../../controller/beer/beerAllGET');
const beerChoiceAromaGET = require('../../controller/beer/beerChoiceAromaGET');
const beerChoiceStyleGET = require('../../controller/beer/beerChoiceStyleGET');
const beerDetailGET = require('../../controller/beer/beerDetailGET');
const beerMonthlyGET = require('../../controller/beer/beerMonthlyGET');
const beerRandomGET = require('../../controller/beer/beerRandomGET');
const beerHeartGET = require('../../controller/beer/beerHeartGET');
const beerTestGET = require('../../controller/beer/beerTestGET');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, beerAllGET.getAllBeer);
router.get('/detail/:id', jwtModule.checkAuth, beerDetailGET.getBeerDetail);
router.get('/monthly', beerMonthlyGET.getMonthlyBeer);
router.get('/random', jwtModule.checkAuth, beerRandomGET.getRandomBeer);
router.get('/style/:cursor', jwtModule.checkAuth, beerChoiceStyleGET.getAllStyleBeer);
router.get('/aroma', jwtModule.checkAuth, beerChoiceAromaGET.getAllAromaBeer);
router.get('/heart/:cursor', jwtModule.checkAuth, beerHeartGET.getAllHeartBeer);
router.get('/test', jwtModule.checkAuth, beerTestGET.getTestBeer);

module.exports = router;