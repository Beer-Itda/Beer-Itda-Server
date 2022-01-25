const express = require('express');
const selectGET = require('../../controller/select/selectGET');
const selectPOST = require('../../controller/select/selectPOST');
const selectStylePOST = require('../../controller/select/selectStylePOST');
const selectAromaPOST = require('../../controller/select/selectAromaPOST');
const router = express.Router();

const jwtModule = require('../../../modules/jwt');

/* GET users listing. */
router.get('/', jwtModule.checkAuth, selectGET.getSelect);
router.post('/', jwtModule.checkAuth, selectPOST.postSelect);
router.post('/style', jwtModule.checkAuth, selectStylePOST.postStyle);
router.post('/aroma', jwtModule.checkAuth, selectAromaPOST.postAroma);

//router.get('/aroma', selectGET.getSelectedAroma);
router.get('/style', jwtModule.checkAuth, selectGET.getSelectStyle);

module.exports = router;