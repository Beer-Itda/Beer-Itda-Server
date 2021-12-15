const express = require('express');
const styleListAllGET = require('../../controller/infomation/styleListAllGET');
const aromaListAllGET = require('../../controller/infomation/aromaListAllGET');
const tosContentGET = require('../../controller/infomation/tosContentGET');
const router = express.Router();

/* GET users listing. */
router.get('/style', styleListAllGET.getAllStyleList);
router.get('/aroma', aromaListAllGET.getAllAromaList);
router.get('/ToS/:contents', tosContentGET.getEachContent);

module.exports = router;