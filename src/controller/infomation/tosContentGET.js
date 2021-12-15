const statusCode = require('../../../modules/statusCode');

module.exports = {
  getEachContent: async (req, res) => {
    try {
      const content = req.params.content;

      if (!content)
        return res.json({
          code: "NEED_CONTENT_TYPE",
          message: "nedd content type"
        });

      switch (content) {
        //공지사항
        case 'notice':
          return res.redirect('https://www.notion.so/b405112691e144989009ba8e7f122e21');
          break;

        //이용약관
        case 'using':
          return res.redirect('https://www.notion.so/bb357f73e3354388a4f3d45877fb6d30');
          break;

        //개인정보 처리방침
        case 'personal':
          return res.redirect('https://www.notion.so/4fdeaa1851e14b69aeaa3b3f9cd4b625');
          break;

        default:
          return res.json({
            code: "WRONG_CONTENT_TYPE",
            message: "wrong content type"
          });
      }
    } catch (error) {
      console.log(error);
      return res.json(
        error
      );
    }
  }
}