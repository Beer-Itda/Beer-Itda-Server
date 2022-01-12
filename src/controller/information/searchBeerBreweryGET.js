const { Beer } = require("../../../models");
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  searchEveryBeerBrewery: async (req, res) => {
    const word = req.query.word;
    const limit = parseInt(req.query.limit);

    if (!word)
      return res.json({
        code: "NEED_SEARCHING_WORD",
        message: "검색어가 필요합니다."
      });

    Beer.findAndCountAll({
      where: {
        [Op.or]: [
          {
            'k_name': {
              [Op.like]: "%" + word + "%"
            }
          },
          {
            'e_name': {
              [Op.like]: "%" + word + "%"
            }
          }
        ]
      },
      limit: limit,
      order: [
        ['k_name', 'ASC'],
        ['e_name', 'ASC']
      ]
    }).then(result => {
      console.log(result)
      return res.json(result);
    }).catch(error => {
      console.log(error);
      return res.json(error);
    });
  }
};