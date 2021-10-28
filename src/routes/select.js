const express = require('express');
const router = express.Router();
const selectController = require('../controller/selectController');

/* GET users listing. */
router.get('/', selectController.getCheckSelect);
router.post('/', selectController.postFirstSelect);
router.put('/style', selectController.modifySelectStyle);
router.put('/aroma', selectController.modifySelectAroma);

module.exports = router;