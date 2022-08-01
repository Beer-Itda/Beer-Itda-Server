const selectService = require('../../service/selectService');

const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const util = require('../../../modules/util');

module.exports = {
    /**
     * @전체_스타일_불러오기
     * @desc 스타일 관련 리스트 전체 불러오기(내가 선택한 스타일 확인)
     */
    getAllStyleList: async (req, res) => {
        try {
            const result = await selectService.getStyleAllInformation();
            const select = await selectService.ChangeSelectArray({user_id: req.token_data.id, value: 'style'});

            let a1, a2, a3, a4, a5, a6, a7, a8;
            [a1, a2, a3, a4, a5, a6, a7, a8 ] = [[], [], [], [], [], [], [], []]

            let b1, b2, b3, b4, b5, b6, b7, b8;
            [b1, b2, b3, b4, b5, b6, b7, b8] = [[], [], [], [], [], [], [], []]

            let c1, c2, c3, c4, c5, c6, c7, c8;
            [c1, c2, c3, c4, c5, c6, c7, c8] = [[], [], [], [], [], [], [], []]

            let obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10;
            [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9, obj10] = [{},{},{},{},{},{},{},{},{},{}];

            //TODO 쿼리 결과를 억지로 끼워놓음 미친놈 김재환
            result.forEach((row) => {
                //style big 1 번째 에서 style mid 1 번째
                if((row.data.A_id === 1) && (row.data.B_id === 5)){
                    row.c.is_selected = select.includes(row.c.id)
                    a1.push(row.c)
                    row.b.style_small = a1;
                    b1 = [row.b]
                    row.a.style_mid = b1;
                    c1 = [row.a]
                }
                //style big 1 번째 에서 style mid 2 번째
                if((row.data.A_id === 1) && (row.data.B_id === 6)){
                    row.c.is_selected = select.includes(row.c.id)
                    a2.push(row.c)
                    row.b.style_small = a2;
                    b2 = [row.b]
                    row.a.style_mid = b2;
                    c2 = [row.a]
                }
                //style big 1 번째 에서 style mid 3 번째
                if((row.data.A_id === 1) && (row.data.B_id === 7)){
                    row.c.is_selected = select.includes(row.c.id)
                    a3.push(row.c)
                    row.b.style_small = a3;
                    b3 = [row.b]
                    row.a.style_mid = b3;
                    c3 = [row.a]
                }
                //style big 1 번째 에서 style mid 4 번째
                if((row.data.A_id === 1) && (row.data.B_id === 8)){
                    row.c.is_selected = select.includes(row.c.id)
                    a4.push(row.c)
                    row.b.style_small = a4;
                    b4 = [row.b]
                    row.a.style_mid = b4;
                    c4 = [row.a]
                }
                //style big 2 번째 에서 style mid 1 번째
                if((row.data.A_id === 2) && (row.data.B_id === 9)){
                    row.c.is_selected = select.includes(row.c.id)
                    a5.push(row.c)
                    row.b.style_small = a5;
                    b5 = [row.b]
                    row.a.style_mid = b5;
                    c5 = [row.a]
                }
                //style big 2 번째 에서 style mid 2 번째
                if((row.data.A_id === 2) && (row.data.B_id === 10)){
                    row.c.is_selected = select.includes(row.c.id)
                    a6.push(row.c)
                    row.b.style_small = a6;
                    b6 = [row.b]
                    row.a.style_mid = b6;
                    c6 = [row.a]
                }
                //style big 3 번째 에서 style mid 1 번째
                if((row.data.A_id === 3) && (row.data.B_id === 11)){
                    row.c.is_selected = select.includes(row.c.id)
                    a7.push(row.c)
                    row.b.style_small = a7;
                    b7 = [row.b]
                    row.a.style_mid = b7;
                    c7 = [row.a]
                }
                //style big 4 번째 에서 style mid 1 번째
                if((row.data.A_id === 4) && (row.data.B_id === 12)){
                    row.c.is_selected = select.includes(row.c.id)
                    a8.push(row.c)
                    row.b.style_small = a8;
                    b8 = [row.b]
                    row.a.style_mid = b8;
                    c8 = [row.a]
                }
            })

            let tmp0 = c1[0].style_mid[0].style_small[c1[0].style_mid[0].style_small.length - 1]
            c1[0].style_mid[0].style_small.splice(c1[0].style_mid[0].style_small.length - 1, 1)
            c1[0].style_mid[0].style_small.unshift(tmp0)

            let tmp1 = c2[0].style_mid[0].style_small[c2[0].style_mid[0].style_small.length - 1]
            c2[0].style_mid[0].style_small.splice(c2[0].style_mid[0].style_small.length - 1, 1)
            c2[0].style_mid[0].style_small.unshift(tmp1)
            c1[0].style_mid.push(c2[0].style_mid[0])

            let tmp2 = c3[0].style_mid[0].style_small[c3[0].style_mid[0].style_small.length - 1]
            c3[0].style_mid[0].style_small.splice(c3[0].style_mid[0].style_small.length - 1, 1)
            c3[0].style_mid[0].style_small.unshift(tmp2)
            c1[0].style_mid.push(c3[0].style_mid[0])

            let tmp3 = c4[0].style_mid[0].style_small[c4[0].style_mid[0].style_small.length - 1]
            c4[0].style_mid[0].style_small.splice(c4[0].style_mid[0].style_small.length - 1, 1)
            c4[0].style_mid[0].style_small.unshift(tmp3)
            c1[0].style_mid.push(c4[0].style_mid[0])

            let tmp4 = c6[0].style_mid[0].style_small[c6[0].style_mid[0].style_small.length - 1]
            c6[0].style_mid[0].style_small.splice(c6[0].style_mid[0].style_small.length - 1, 1)
            c6[0].style_mid[0].style_small.unshift(tmp4)
            c5[0].style_mid.push(c6[0].style_mid[0])

            let tmp5 = c5[0].style_mid[0].style_small[c5[0].style_mid[0].style_small.length - 1]
            c5[0].style_mid[0].style_small.splice(c5[0].style_mid[0].style_small.length - 1, 1)
            c5[0].style_mid[0].style_small.unshift(tmp5)
            c1.push(c5[0])

            let tmp6 = c7[0].style_mid[0].style_small[c7[0].style_mid[0].style_small.length - 1]
            c7[0].style_mid[0].style_small.splice(c7[0].style_mid[0].style_small.length - 1, 1)
            c7[0].style_mid[0].style_small.unshift(tmp6)
            c1.push(c7[0])

            let tmp7 = c8[0].style_mid[0].style_small[c8[0].style_mid[0].style_small.length - 1]
            c8[0].style_mid[0].style_small.splice(c8[0].style_mid[0].style_small.length - 1, 1)
            c8[0].style_mid[0].style_small.unshift(tmp7)
            c1.push(c8[0])
            return res.status(statusCode.OK).json({data: c1});
        } catch (error) {
            console.error(error);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
        }
    }
};