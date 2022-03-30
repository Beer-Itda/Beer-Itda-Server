const { Beer, Style, Aroma, Country} = require("../../../models");
const sequelize = require('sequelize');
const informationService = require("../../service/informationService");
const statusCode = require("../../../modules/statusCode");
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
      const beer_data = [];
      for await (let beer_detail of result.rows) {
        const style_name = await Style.findOne({
          attributes: ['name'],
          where: {
            id: beer_detail.style_id,
            level: 3
          }, raw: true
        })
        const country_name = await Country.findOne({
          attributes: ['country'],
          where: {
            id: beer_detail.country_id
          },
          raw: true
        })
        beer_detail.aroma = []
        if (beer_detail.aroma_id_1) {
          const aroma_name_1 = await Aroma.findOne({
            attributes: ['aroma'],
            where: {
              id: beer_detail.aroma_id_1
            },
            raw: true
          })
          beer_detail.aroma.push(aroma_name_1.aroma)
        }
        if (beer_detail.aroma_id_2) {
          const aroma_name_2 = await Aroma.findOne({
            attributes: ['aroma'],
            where: {
              id: beer_detail.aroma_id_2
            },
            raw: true
          })
          beer_detail.aroma.push(aroma_name_2.aroma)
        }
        if (beer_detail.aroma_id_3) {
          const aroma_name_3 = await Aroma.findOne({
            attributes: ['aroma'],
            where: {
              id: beer_detail.aroma_id_3
            },
            raw: true
          })
          beer_detail.aroma.push(aroma_name_3.aroma)
        }
        if (beer_detail.aroma_id_4) {
          const aroma_name_4 = await Aroma.findOne({
            attributes: ['aroma'],
            where: {
              id: beer_detail.aroma_id_4
            },
            raw: true
          })
          beer_detail.aroma.push(aroma_name_4.aroma)
        }
        beer_data.push(beer_detail)
        beer_detail.country = country_name.country
        beer_detail.style = style_name.name
        delete beer_detail.country_id
        delete beer_detail.style_id
        delete beer_detail.aroma_id_1
        delete beer_detail.aroma_id_2
        delete beer_detail.aroma_id_3
        delete beer_detail.aroma_id_4
      }
      const response = await informationService.get_paging_data(result, page, limit);
      //paginate 오류일 경우
      if(!response)
        res.status(statusCode.CONFLICT).json({
          code: "SEARCH_ERROR",
          message: "결과를 불러오는 중 에러가 발생했습니다."
        })
      //paginate 정상
      return res.status(statusCode.OK).json(response);
    }).catch(error => {
      console.log(error);
      return res.json(error);
    });
  }
};