const express = require('express');
const router = express.Router();
const app = express();

const User = require('./user');
const Level = require('./level');
const Heart = require('./heart');
const Beer = require('./beer');
const Select = require('./select');
const Infomation = require('./infomation');

//유저  관련
router.use('/user', User);

//유저 등급 관련
router.use('/level', Level);

//유저 하트(찜하기) 관련
router.use('/heart', Heart);

//맥주 관련
router.use('/beer', Beer);

//맥주 선택 관련
router.use('/select', Select);

//맥주 정보 관련
router.use('/infomation', Infomation);

module.exports = router;