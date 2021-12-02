const express = require('express');
const router = express.Router();
const app = express();

const User = require('./user');
const Beer = require('./beer');
const Level = require('./level');
const Select = require('./select');

//유저  관련
router.use('/user', User);

//맥주 관련
router.use('/beer', Beer);

//유저 등급 관련
router.use('/level', Level);

//맥주 선택 관련
router.use('/select', Select);

module.exports = router;

