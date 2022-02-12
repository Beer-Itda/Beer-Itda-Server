module.exports = {
    calc_user_review_level: async(review_count, req, res) => {
        try{
            let level_id;
            switch (review_count){
                case review_count < 4:
                   level_id = 1;
                    break;
                case review_count < 24:
                    level_id = 2;
                    break;
                case review_count < 100:
                    level_id = 3;
                    break;
                case review_count < 500:
                    level_id = 4;
                    break;
            }
            return level_id;
        } catch (error){
            console.log(error);
            return res.json(error);
        }
    }
}
