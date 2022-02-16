module.exports = {
  success: (message, data) => {
    return {
      success: true,
      message: message,
      data: data,
    };
  },
  fail: (message) => {
    return {
      success: false,
      message: message,
    };
  },
  paginate_result_response: (paginate_data, data) => {
    return {
      total_data: paginate_data.total_data,
      total_page: paginate_data.total_page,
      current_page: paginate_data.current_page,
      previous_page: paginate_data.previous_page,
      next_page: paginate_data.next_page,
      data: data
    };
  }
};
