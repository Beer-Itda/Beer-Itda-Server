const {
  Beer,
  Style_Small
} = require('../../models');

module.exports = {
  getAromaBeer: ({}),
  /*
  getStyleBeer: ({
    style_d
  }) => i{
    try {

    } catch (err) {
      throw err;
    }
  },

  orderByResolver: {
    [BeerListOrderBy.ID_ASC]: {
      cursor: "beer.id",
      orderBy: {
        "beer.id": "ASC",
      },
    },

    [BeerListOrderBy.STYLE_ID_ASC]: {
      cursor: "CONCAT(LPAD(POW(10, 5) - style_id, 5, '0'), LPAD(POW(10, 5) - id, 5, '0'))",
      orderBy: {
        "beer.style": "ASC",
        "beer.id": "ASC",
      },
    },
  }
  */
  //별점 계산 자동화 (그때그때 계산하면 넘 오래걸리미)
  getCountStarAvg: ({}),

}