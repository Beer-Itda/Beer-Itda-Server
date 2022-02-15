module.exports = {
  get_pagination: async (page, size) => {
    //표시할 사이즈를 정하고 디폴트는 5개
    const limit = size ? +size : 5;
    //넘어가는 item 을 offset 이라고 표현한다.
    //페이지가 없으면 0번째라고 판단하여 넘김
    //페이지가 있다면 표시할 item 과 페이지를 곱하여 그만큼 넘기고 그때부터 출력 시작
    const offset = page ? page * limit : 0;

    return { limit, offset };
  },
  get_paging_data: async (data, page, limit) => {
    //쿼리 결과 전달
    const { count: total_data, rows: beer_data } = data;
    //현재 페이지 출력
    const current_page = page ? +page : 0;
    //총 페이지는 정수로 올림하기
    const total_page = Math.ceil(total_data / limit);
    //이전 페이지에 대한 연산
    //음수가 나오면 안되므로 최소 기본 이전 페이지는 0 번째 페이지
    //현재 페이지와 총 페이지가 같다면 음수가 아닌 이상 현재 페이지의 이전 페이지 출력
    let previous_page;
    if ((current_page < total_page)) {
      previous_page = (current_page - 1) < 0 ? 0 : current_page - 1;
    } else {
      previous_page = (current_page - 1) < 0 ? 0 : current_page - 1;
    }
    //다음 페이지는 총 페이지를 넘을 수 없어서 넘는다 하더라도 총 페이지 출력
    const next_page = (current_page < total_page) ? current_page + 1 : total_page;

    return { total_data, beer_data, total_page, current_page, previous_page, next_page };
  }
}