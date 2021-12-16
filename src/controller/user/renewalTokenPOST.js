const jwt = require('jsonwebtoken');
const token_config = require('../../../config/token');
const jwt_module = require('../../../modules/jwt');

module.exports = {
  renewalWithRefresh: async (req, res) => {
    try {
      //리프레시 토큰 받기
      const refresh_token = req.body.refresh_token;

      if (!refresh_token)
        return res.json({
          code: "TOKEN_ERROR",
          message: "토큰 에러입니다."
        });

      //리프레시 토큰 검사
      const token_data = jwt.verify(refresh_token, token_config.jwt.refreshSecret);
      //{ id: 13, iat: 1638683364, exp: 1639892964 }

      //아니면 재 접속
      if (!token_data)
        return res.json({
          code: "TOKEN_ERROR",
          message: "토큰 에러입니다."
        });
      //맞으면 access_token 생성
      const beeritda_access_token = await jwt_module.create_access_token(token_data);

      return res.json({
        access_token: beeritda_access_token
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  }
};