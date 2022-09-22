const {Select, Style} = require('../../../models');
const util = require('../../../modules/util');
const statusCode = require('../../../modules/statusCode');
const responseMessage = require('../../../modules/responseMessage');
const selectService = require('../../service/selectService');

module.exports = {
    /**
     * @좋아하는_스타일_선택하기
     * @desc 좋아하는 스타일 선택하기
     */
    postStyle: async (req, res) => {
        const user_id = req.token_data.id;
        let {style_ids} = req.body;
        if (!style_ids) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: responseMessage.SELECT_INFO_FAIL
            });
        }
        try {
            //TODO - 그냥 저는 미친놈입니다
            //992
            //13~40 인데 level 3, level_parent 2, level_parent_detail 1
            if (style_ids.includes(992)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 1
                    }, raw: true
                })
                const style_992 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_992.length; j++) {
                        if (style_ids[i] === style_992[j]) {
                            style_ids.splice(i, 1)
                            style_992.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_992.unshift(992)
                style_ids.push(...style_992)
            }
            //993
            //41~53 인데 level 3, level_parent 2, level_parent_detail 2
            if (style_ids.includes(993)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 2
                    }, raw: true
                })
                const style_993 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_993.length; j++) {
                        if (style_ids[i] === style_993[j]) {
                            style_ids.splice(i, 1)
                            style_993.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_993.unshift(993)
                style_ids.push(...style_993)
            }

            //994
            //54~61 인데 level 3, level_parent 2, level_parent_detail 3
            if (style_ids.includes(994)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 3
                    }, raw: true
                })
                const style_994 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_994.length; j++) {
                        if (style_ids[i] === style_994[j]) {
                            style_ids.splice(i, 1)
                            style_994.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_994.unshift(994)
                style_ids.push(...style_994)
            }
            //995
            //62~68 인데 level 3, level_parent 2, level_parent_detail 4
            if (style_ids.includes(995)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 4
                    }, raw: true
                })
                const style_995 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_995.length; j++) {
                        if (style_ids[i] === style_995[j]) {
                            style_ids.splice(i, 1)
                            style_995.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_995.unshift(995)
                style_ids.push(...style_995)
            }
            //996
            //69~81 인데 level 3, level_parent 2, level_parent_detail 5
            if (style_ids.includes(996)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 5
                    }, raw: true
                })
                const style_996 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_996.length; j++) {
                        if (style_ids[i] === style_996[j]) {
                            style_ids.splice(i, 1)
                            style_996.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_996.unshift(996)
                style_ids.push(...style_996)
            }
            //997
            //82~85 인데 level 3, level_parent 2, level_parent_detail 6
            if (style_ids.includes(997)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 6
                    }, raw: true
                })
                const style_997 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_997.length; j++) {
                        if (style_ids[i] === style_997[j]) {
                            style_ids.splice(i, 1)
                            style_997.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_997.unshift(997)
                style_ids.push(...style_997)
            }
            //998
            //86~87 인데 level 3, level_parent 2, level_parent_detail 7
            if (style_ids.includes(998)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 7
                    }, raw: true
                })
                const style_998 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_998.length; j++) {
                        if (style_ids[i] === style_998[j]) {
                            style_ids.splice(i, 1)
                            style_998.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_998.unshift(998)
                style_ids.push(...style_998)
            }
            //999
            //88~96 인데 level 3, level_parent 2, level_parent_detail 8
            if (style_ids.includes(999)) {
                const styleAllData = await Style.findAll({
                    attributes: ['id'],
                    where: {
                        level: 3,
                        level_parent: 2,
                        level_detail_parent: 8
                    }, raw: true
                })
                const style_999 = styleAllData.map(item => item.id)

                for (let i = 0; i < style_ids.length; i++) {
                    for (let j = 0; j < style_999.length; j++) {
                        if (style_ids[i] === style_999[j]) {
                            style_ids.splice(i, 1)
                            style_999.splice(j, 1);
                            j--;
                        }
                    }
                }
                style_999.unshift(999)
                style_ids.push(...style_999)
            }
            //1. Select 테이블에 user_id가 있는지 확인
            const alreadySelect = await selectService.FirstSelectCheck({user_id});

            if (alreadySelect === 'first') {
                //select 한적이 없으므로 create
                await Select.create({
                    style: style_ids.toString(),
                    user_id: user_id
                });
            }
            if (alreadySelect === 'selected') {
                //이미 select 한적이 있으므로 update
                await Select.update({
                    style: style_ids.toString(),
                }, {
                    where: {
                        user_id: user_id
                    },
                });
            }
            const result = await Select.findOne({
                attributes: ['style'],
                where: {
                    user_id: user_id
                },
                raw: true
            });
            return res.status(statusCode.OK).send({
                style: result.style.split(',').map(Number)
            });
        } catch (err) {
            console.log(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(responseMessage.INTERNAL_SERVER_ERROR));
        }
    },
}