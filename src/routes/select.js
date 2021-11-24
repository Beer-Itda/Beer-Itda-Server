const express = require('express');
const selectPOST = require('../controller/select/selectPOST');
const selectUPDATE = require('../controller/select/selectUPDATE');
const router = express.Router();

/* GET users listing. */
router.get('/', selectPOST.getCheckSelect);
router.post('/', selectPOST.postFirstSelect);
router.put('/style', selectUPDATE.modifySelectStyle);
router.put('/aroma', selectUPDATE.modifySelectAroma);

module.exports = router;