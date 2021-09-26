exports.list = function (page, callback) {
  pool.getConnection(function (err, conn) {
    if (err) {
      console.error('err', err);
    }
    var sql = "select * from beer;";
    conn.query(sql, [], function (err, rows) {
      if (err) {
        console.error('err', err);
      }
      conn.query("select count(*) cnt from beer", [], function (err, rows) {
        if (err) {
          console.error('err', err);
        }
        console.log("rows", rows); //[{cnt:1}]
        var cnt = rows[0].cnt;
        var size = 10; // 한번에 보여줄 맥주의 수
        var begin = (page - 1) * size; // 시작하는(첫번째) 맥주
        var totalPage = Math.ceil(cnt / size);
        var pageSize = 10; // 링크 갯수
        var startPage = Math.floor((page - 1) / pageSize) * pageSize + 1;
        var endPage = startPage + (pageSize - 1);
        if (endPage > totalPage) {
          endPage = totalPage;
        }
        var max = cnt - ((page - 1) * size);
        conn.query("select id from beer order by num desc limit ?,?", [begin, size], function (err, rows) {
          if (err) {
            console.error('err', err);
          }
          console.log('rows', rows);
          var datas = {
            title: "맥주 리스트",
            data: rows,
            page: page,
            pageSize: pageSize,
            startPage: startPage,
            endPage: endPage,
            totalPage: totalPage,
            max: max
          };
          conn.release();
          callback(datas);
        });
      });
    });
  });
}