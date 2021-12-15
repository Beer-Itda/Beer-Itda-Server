const express = require('express');
const styleListAllGET = require('../../controller/information/styleListAllGET');
const aromaListAllGET = require('../../controller/information/aromaListAllGET');
const tosContentGET = require('../../controller/information/tosContentGET');
const router = express.Router();

/* GET users listing. */
router.get('/style', styleListAllGET.getAllStyleList);
router.get('/aroma', aromaListAllGET.getAllAromaList);
router.get('/ToS/:content', tosContentGET.getEachContent);

module.exports = router;