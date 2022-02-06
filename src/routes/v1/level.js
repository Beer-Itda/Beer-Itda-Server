const express = require('express');
const router = express.Router();
const jwt_module = require('../../../modules/jwt');

const levelListAllGET = require('../../controller/level/levelListAllGET');

router.get('/', jwt_module.checkAuth, levelListAllGET.getLevelListAll);

module.exports = router;
