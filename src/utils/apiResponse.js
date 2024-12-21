class ApiResponse {
  static success(res, statusCode = 200, status = "success", message, data = null) {
    if (data === null) {
      return res.status(statusCode).json({
        status: status,
        message: message,
      });
    } else {
      return res.status(statusCode).json({
        status: status,
        message: message,
        data: data,
      });
    }
  }
}

module.exports = ApiResponse;
