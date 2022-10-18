const {
  Select,
  Aroma,
  Style_Small,
  Style_Mid,
  Style_Big,
  Style,
} = require("../../models");
const { sequelize } = require("../../models/index");

module.exports = {
  //맨 처음 스타일, 향 설정
  FirstSelectCheck: async ({ user_id }) => {
    try {
      //있으면 첫 선택이 아님
      const alreadySelect = await Select.findOne({
        where: {
          user_id: user_id,
        },
        raw: true,
      });
      if (alreadySelect) {
        return "selected";
      }
      return "first";
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //select 한 style, aroma 을 배열로 바꿔주기 (여기서 value 는 style, aroma 값 중 1)
  ChangeSelectArray: async ({ user_id, value }) => {
    try {
      const select = await Select.findOne({
        attribute: ["id", "style", "aroma"],
        where: {
          user_id: user_id,
        },
        raw: true,
      });

      //값을 배열로 바꾸는 로직
      if (value === "style") {
        if (!select) {
          return null;
        }
        const select_value = select.style;
        return select_value.split(",").map(Number);
      }
      if (value === "aroma") {
        if (!select) {
          return null;
        }
        const select_value = select.aroma;
        return select_value.split(",").map(Number);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //select 여부에 따라 boolean 배열로 내보내기
  GetSelectList: async ({ value, selected_ids }) => {
    let data;
    try {
      if (value === "style") {
        data = await Style.findAll({
          where: {
            level: 3,
          },
          raw: true,
        });
      }
      if (value === "aroma") {
        data = await Aroma.findAll({ raw: true });
      }
      const all_ids = [];
      for (let i in data) {
        all_ids[i] = data[i].id;
      }
      const select_list = [];
      if (selected_ids === null) {
        for (let j in all_ids) {
          select_list.push(false);
        }
        return select_list;
      }
      for (let i in all_ids) {
        const alreadySelect = selected_ids.includes(all_ids[i]);
        if (alreadySelect === true) {
          select_list.push(true);
        }
        if (alreadySelect === false) {
          select_list.push(false);
        }
      }
      return select_list;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //전체 리스트에 is_selected 값 추가하기
  mergeData: async ({ value, select_list }) => {
    let data;
    try {
      if (value === "style") {
        data = await Style_Big.findAll({
          include: [
            {
              model: Style_Mid,
              include: [
                {
                  model: Style_Small,
                },
              ],
            },
          ],
          raw: true,
        });

        function style_merge_object(obj1, obj2) {
          const newObj = [];
          let i,
            j,
            k,
            cnt = 0;

          for (i in obj1) {
            newObj[i] = obj1[i];
          }
          i = 0;
          for (i in obj1) {
            for (j in obj1[i].Style_Mids) {
              for (k in obj1[i].Style_Mids[j].Style_Smalls) {
                //0~83
                newObj[i].Style_Mids[j].Style_Smalls[k].is_selected = obj2[cnt];
                cnt += 1;
              }
            }
          }
          return newObj;
        }
        return style_merge_object(data, select_list);
      }

      if (value === "aroma") {
        data = await Aroma.findAll({ raw: true });

        function aroma_merge_object(obj1, obj2) {
          const newObj = [];
          for (let i in obj1) {
            newObj[i] = obj1[i];
          }
          for (let i in obj2) {
            newObj[i].is_selected = obj2[i];
          }
          return newObj;
        }

        return aroma_merge_object(data, select_list);
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //새로운 스타일 적용
  getStyleAllInformation: async () => {
    try {
      const query = `
      SELECT JSON_OBJECT(
               'A_id', A.id,
               'A_name', A.name,
               'B_id', B.id,
               'B_description', B.description,
               'B_name', B.name,
               'C_id', C.id,
               'C_name', C.name
           ) as data,
       JSON_OBJECT(
               'id', A.id,
               'name', A.name
           ) as a,
       JSON_OBJECT(
               'id', B.id,
               'name', B.name,
               'description', B.description
           ) as b,
       JSON_OBJECT(
               'id', C.id,
               'name', C.name
           ) as c
FROM Style A
         INNER JOIN Style B ON A.level = B.level_parent AND A.level_detail = B.level_detail_parent
         INNER JOIN Style C ON B.level = C.level_parent AND B.level_detail = C.level_detail_parent
GROUP BY A.id, B.id, C.id, data, a, b, c;
      `;
      return await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
