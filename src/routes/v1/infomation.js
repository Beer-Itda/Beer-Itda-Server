const express = require('express');
const styleListAllGET = require('../../controller/infomation/styleListAllGET');
const aromaListAllGET = require('../../controller/infomation/aromaListAllGET');
const router = express.Router();

/* GET users listing. */
router.get('/style', styleListAllGET.getAllStyleList);
router.get('/aroma', aromaListAllGET.getAllAromaList);

module.exports = router;