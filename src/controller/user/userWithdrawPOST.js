const {User, Heart, Review, Select} = require("../../../models");
const statusCode = require("../../../modules/statusCode");
module.exports = {
    userWithdraw: async (req, res) => {
    try {
        //유저 정보 삭제
        const userResult = await User.destroy({
            where: {
                id: req.token_data.id
            }, raw: true
        })
        if (!userResult)
            return res.status(statusCode.CONFLICT).json({
                code: "WITHDRAW_ERROR",
                message: "탈퇴 처리 중 에러가 발생했습니다."
            })
        //찜하기 삭제
        const heartResult = await Heart.destroy({
            where:{
                user_id: req.token_data.id
            }, raw: true
        })
        // if (!heartResult)
        //     return res.status(statusCode.CONFLICT).json({
        //         code: "WITHDRAW_ERROR",
        //         message: "탈퇴 처리 중 에러가 발생했습니다."
        //     })
        //리뷰 삭제
        const reviewResult = await Review.destroy({
            where:{
                user_id: req.token_data.id
            }, raw: true
        })
        // if (!reviewResult)
        //     return res.status(statusCode.CONFLICT).json({
        //         code: "WITHDRAW_ERROR",
        //         message: "탈퇴 처리 중 에러가 발생했습니다."
        //     })
        //선택 삭제
        const selectResult = await Select.destroy({
            where:{
                user_id: req.token_data.id
            }, raw: true
        })
        // if (!selectResult)
        //     return res.status(statusCode.CONFLICT).json({
        //         code: "WITHDRAW_ERROR",
        //         message: "탈퇴 처리 중 에러가 발생했습니다."
        //     })
        return res.status(statusCode.OK).json({
            message: 'success'
        })
    } catch (error) {
        console.log(error);
        return res.json(error)
    }
}
}