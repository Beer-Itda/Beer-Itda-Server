const express = require('express');
const router = express.Router();
const selectController = require('../controller/selectController');

/* GET users listing. */
router.post('/', selectController.postFirstSelect);
router.put('/style', selectController.modifySelectStyle);
router.put('/aroma', selectController.modifySelectAroma);
//router.delete('/', selectController.deleteSelect);
module.exports = router;