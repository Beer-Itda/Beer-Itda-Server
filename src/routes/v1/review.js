const express = require('express');
const router = express.Router();
const jwt_module = require('../../../modules/jwt');

const reviewAllListGET = require('../../controller/review/reviewAllListGET');
const reviewReadOneGET = require('../../controller/review/reviewReadOneGET');
const reviewWritePOST = require('../../controller/review/reviewWritePOST');
const reviewModifyPATCH = require('../../controller/review/reviewModifyPATCH');
const reviewRemoveDELETE = require('../../controller/review/reviewRemoveDELETE');

//개인 리뷰 불러오기
router.get('/', jwt_module.checkAuth, reviewReadOneGET.readMyReviewList);

//리뷰 전체 불러오기
router.get('/:beer_id', reviewAllListGET.getAllReviewByBeer);

//개인 리뷰 작성하기
router.post('/:beer_id', jwt_module.checkAuth, reviewWritePOST.writeMyReview);

//개인 리뷰 수정하기
router.patch('/:beer_id', jwt_module.checkAuth, reviewModifyPATCH.modifyMyReview);

//개인 리뷰 삭제하기
router.delete('/:beer_id', jwt_module.checkAuth, reviewRemoveDELETE.removeMyReview);

module.exports = router;