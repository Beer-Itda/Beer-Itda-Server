const express = require('express');
const selectGET = require('../../controller/select/selectGET');
const selectPOST = require('../../controller/select/selectPOST');
const router = express.Router();

/* GET users listing. */
router.get('/', selectPOST.getCheckSelect);
router.post('/', selectPOST.postFirstSelect);
//router.put('/:id', selectUPDATE.modifySelect);

router.get('/aroma', selectGET.getSelectedAroma);
router.get('/style', selectGET.getSelectedStyle);

module.exports = router;