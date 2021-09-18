const express = require('express');
const router = express.Router();
const beerController = require('../controller/beerController');

/* GET users listing. */
router.get('/suagongzu', beerController.getCheckBeer);
router.get('/', beerController.getAllBeer);
router.get('/monthly', beerController.getMonthlyBeer);
router.get('/style', beerController.getAllStyleBeer);
router.get('/', beerController.getAllAromaBeer);

module.exports = router;