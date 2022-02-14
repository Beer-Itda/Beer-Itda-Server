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
    }
}
