const { Review, Beer } = require("../../../models");

module.exports = {
  //나의 페이지에서 내가 작성한 모든 리뷰를 불러온다.
  readMyReviewList: async (req, res) => {
    try {
      //토큰 데이터를 이용하여 리뷰 테이블에서 검색한다.
      const my_review = await Review.findAll({
        where: {
          user_id: req.token_data.id
        },
        raw: true
      });

      //없으면 없다.
      if (!my_review)
        return res.json({
          code: "BEER_REVIEW_ERROR",
          message: "리뷰를 불러오는 중 에러가 발생했습니다."
        });
      //맥주 데이터와 리뷰 데이터를 합쳐서 전체 출력
      const reuslt_my_review = await review_plus_beer(my_review);

      //출력된 데이터 모두를 시간 내림 차순으로 출력한다.
      return res.json({
        'my_reivew': reuslt_my_review
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
};

async function review_plus_beer(my_review) {
  const all_my_review = [];
  for (let i = 0; i < my_review.length; i++) {
    const beer_id = my_review[i].beer_id;
    const beer_data_by_review = await find_beer(beer_id);

    const add_beer_review_data = {
      'beer': beer_data_by_review,
      'review': my_review[i]
    };
    all_my_review.push(add_beer_review_data);
  };
  return all_my_review;
};

async function find_beer(beer_id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = Beer.findOne({
        where: {
          id: beer_id
        },
        raw: true
      });
      resolve(result)
    }, 5)
  })
}