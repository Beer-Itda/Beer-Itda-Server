const {
  Select, Aroma, Style_Small, Style_Mid, Style_Big,
} = require('../../models');

module.exports = {
  //맨 처음 스타일, 향 설정
  FirstSelectCheck: async ({
    user_id
  }) => {
    try {
      //있으면 첫 선택이 아님
      const alreadySelect = await Select.findOne({
        where: {
          user_id: user_id,
        }
      });
      if (alreadySelect) {
        return 'selected'
      }
      return 'first';
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //select 한 style, aroma 을 배열로 바꿔주기 (여기서 value 는 style, aroma 값 중 1)
  ChangeSelectArray: async ({
    user_id,
    value
  }) => {
    try {
      const select = await Select.findOne({
        attribute: ['id', 'style', 'aroma'],
        where: {
          user_id: user_id,
        }
      });

      //값을 배열로 바꾸는 로직
      if (value === 'style') {
        const select_value = select.dataValues.style;
        return select_value.split(',').map(Number)
      }
      if (value === 'aroma') {
        const select_value = select.dataValues.aroma;
        return select_value.split(',').map(Number)
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  //select 여부에 따라 boolean 배열로 내보내기
  GetSelectList: async ({
    value, selected_ids
  }) => {
    //console.log('[service] : ', value, selected_ids);
    let data;
    try {
      if (value === 'style') {
        data = await Style_Small.findAll({});
      }
      if (value === 'aroma') {
        data = await Aroma.findAll({});
      }

      const all_ids = [];
      for (let i in data) {
        all_ids[i] = data[i].id;
      }

      const select_list = [];
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
  mergeData: async ({ 
    value, select_list
  }) => {
    let data;
    try {
      if (value === 'style') {
        data = await Style_Big.findAll({
          include: [{
            model: Style_Mid,
            include: [{
              model: Style_Small,
            }],
          }],
        });

        function style_merge_object(obj1, obj2) {
          const newObj = [];
          let i, j, k, cnt = 0;

          for (i in obj1) {
            newObj[i] = obj1[i].dataValues;
          }
          i = 0;
          for (i in obj1) {
            for (j in obj1[i].Style_Mids) {
              for (k in obj1[i].Style_Mids[j].Style_Smalls) { //0~83
                newObj[i].Style_Mids[j].Style_Smalls[k].dataValues.is_selected = obj2[cnt];
                cnt += 1;
              }
            }
          }
          return newObj;
        }
        return style_merge_object(data, select_list);
      }

      if (value === 'aroma') {
        data = await Aroma.findAll({});

        function aroma_merge_object(obj1, obj2) {
          const newObj = [];
          for (let i in obj1) {
            newObj[i] = obj1[i].dataValues;
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
};