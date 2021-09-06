const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/beer', require('./beer'));
router.use('/level', require('./level'));

module.exports = router;