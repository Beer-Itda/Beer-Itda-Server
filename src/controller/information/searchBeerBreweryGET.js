const { Beer } = require("../../../models");
const sequelize = require('sequelize');
const Op = sequelize.Op;

module.exports = {
  searchEveryBeerBrewery: async (req, res) => {
    const word = req.query.word;

    if (!word)
      return res.json({
        code: "NEED_SEARCHING_WORD",
        message: "검색어가 필요합니다."
      });

    Beer.findAll({
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
      order: [
        ['k_name', 'ASC'],
        ['e_name', 'ASC']
      ]
    }).then(result => {
      return res.json(result);
    }).catch(error => {
      console.log(error);
      return res.json(error);
    });
  }
};