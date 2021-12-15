const express = require('express');
const selectGET = require('../../controller/select/selectGET');
const selectPOST = require('../../controller/select/selectPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, selectPOST.getCheckSelect);
router.post('/', jwtModule.checkAuth, selectPOST.postSelect);

router.get('/aroma', selectGET.getSelectedAroma);
router.get('/style', selectGET.getSelectedStyle);

module.exports = router;