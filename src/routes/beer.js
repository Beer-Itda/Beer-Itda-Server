const express = require('express');
const router = express.Router();
const beerController = require('../controller/beerController');

/* GET users listing. */
router.get('/', beerController.getAllBeer);
router.get('/:id', beerController.getOneBeer);
router.get('/monthly', beerController.getMonthlyBeer);
router.get('/style', beerController.getAllStyleBeer);
router.get('/aroma', beerController.getAllAromaBeer);

module.exports = router;