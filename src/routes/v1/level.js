const express = require('express');
const router = express.Router();

const levelListAllGET = require('../../controller/level/levelListAllGET');

router.get('/', levelListAllGET.getLevelListAll);

module.exports = router;
