module.exports = {
  //리뷰 등록
  //리뷰 수정
  //리뷰 삭제
  //할 때 마다 리뷰 테이블 총 계산
  //결과값 도출
  calcReviewData: async (req, res) => {
    try {
      const reviewDataByBeer = await Review.findAll({
        where: {
          beer_id: beer_id
        }
      });

      if (!reviewDataByBeer)
        return res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });



    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }



  //Beer에 별점 평균과 리뷰갯수 전송
  //저장

}