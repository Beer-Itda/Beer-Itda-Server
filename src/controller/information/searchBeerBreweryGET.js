const { Beer } = require("../../../models");
const sequelize = require('sequelize');
const informationService = require("../../service/informationService");
const { informationServie } = require("../../service");
const Op = sequelize.Op;

module.exports = {
  searchEveryBeerBrewery: async (req, res) => {
    const { page, size, word } = req.query;

    if (!word)
      return res.json({
        code: "NEED_SEARCHING_WORD",
        message: "검색어가 필요합니다."
      });

    const { limit, offset } = await informationService.get_pagination(page, size);

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
      offset: offset,
      order: [
        ['k_name', 'ASC'],
        ['e_name', 'ASC']
      ],
      raw: true
    }).then(async result => {
      const response = await informationServie.get_paging_data(result, page, limit);
      return res.json(response);
    }).catch(error => {
      console.log(error);
      return res.json(error);
    });
  }
};