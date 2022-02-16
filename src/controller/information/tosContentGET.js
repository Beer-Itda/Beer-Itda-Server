const statusCode = require('../../../modules/statusCode');

module.exports = {
  getEachContent: async (req, res) => {
    try {
      const content = req.params.content;

      if (!content)
        return res.status(statusCode.NOT_FOUND).json({
          code: "NEED_CONTENT_TYPE",
          message: "need content type"
        });

      switch (content) {
        //공지사항
        case 'notice':
          return res.status(statusCode.OK).redirect('https://www.notion.so/b405112691e144989009ba8e7f122e21');

        //이용약관
        case 'using':
          return res.status(statusCode.OK).redirect('https://www.notion.so/bb357f73e3354388a4f3d45877fb6d30');

        //개인정보 처리방침
        case 'personal':
          return res.status(statusCode.OK).redirect('https://www.notion.so/4fdeaa1851e14b69aeaa3b3f9cd4b625');

        default:
          return res.status(statusCode.CONFLICT).json({
            code: "WRONG_CONTENT_TYPE",
            message: "wrong content type"
          });
      }
    } catch (error) {
      console.log(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json(
        error
      );
    }
  }
}