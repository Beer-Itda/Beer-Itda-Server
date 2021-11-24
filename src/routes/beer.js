const express = require('express');
const beerAllGET = require('../controller/beer/beerAllGET');
const beerChoiceAromaGET = require('../controller/beer/beerChoiceAromaGET');
const beerChoiceStyleGET = require('../controller/beer/beerChoiceStyleGET');
const beerDetailGET = require('../controller/beer/beerDetailGET');
const beerMonthlyGET = require('../controller/beer/beerMonthlyGET');
const router = express.Router();

/* GET users listing. */
router.get('/', beerAllGET.getAllBeer);
router.get('/detail/:id', beerDetailGET.getBeerDetail);
router.get('/monthly', beerMonthlyGET.getMonthlyBeer);
router.get('/style', beerChoiceStyleGET.getAllStyleBeer);
router.get('/aroma', beerChoiceAromaGET.getAllAromaBeer);

module.exports = router;