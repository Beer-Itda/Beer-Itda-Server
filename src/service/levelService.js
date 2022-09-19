const {Level, User} = require("../../models");
const statusCode = require("../../modules/statusCode");
module.exports = {
    calc_user_review_level: async(review_count, req, res) => {
        try{
            let level_id = 0;
            if(review_count < 5)
                return level_id = 1;
            else if (review_count < 25)
                return level_id = 2;
            else if (review_count < 100)
                return level_id = 3;
            else if (review_count < 500)
                return level_id = 4;
            else
                return level_id = 5;
        } catch (error){
            console.log(error);
            return res.json(error);
        }
    },
    calc_user_review_and_level: async(user_id, req, res) => {
        try{
            //level 전체
            const levels = await Level.findAll({raw: true});
            //user 데이터
            const user = await User.findOne({
                attributes: ['review_count', 'level_id'],
                where: {
                    id: user_id
                }, raw: true
            });
            if(!user) return 'user_not_found';
            //유저 레벨
            const user_current_level = await Level.findOne({
                attributes: ['id', 'level', 'level_count','level_image'],
                where: {
                    id: user.level_id
                }, raw: true
            });
            //유저 다음 레벨 계산
            const next_level_data = levels.find(level_data => level_data.id === (user.level_id + 1));
            //남은 리뷰 갯수 계산
            const need_review_count = next_level_data.level_count - user.review_count;
            //current_level - 유저 현재 레벨
            //need_review_count - 다음 리뷰까지 필요한 리뷰 갯수
            //next_level - 유저 다음 레벨
            const user_result_data = {};
            user_result_data.current_level_id = user_current_level.id;
            user_result_data.current_review_count = user.review_count;
            user_result_data.current_level = user_current_level.level;
            user_result_data.current_level_image = user_current_level.level_image;
            user_result_data.need_review_count = need_review_count;
            user_result_data.next_level = next_level_data.level;

            return user_result_data;
        } catch (error){
            console.log(error);
            return res.json(error);
        }
    }
}
