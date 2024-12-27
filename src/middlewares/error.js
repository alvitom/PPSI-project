const { ZodError } = require("zod");
const ApiError = require("../exceptions/ApiError");
const NotFoundError = require("../exceptions/NotFoundError");

class ErrorMiddleware {
  static notFound(req, _, next) {
    next(new NotFoundError(`Not Found - ${req.originalUrl}`));
  }

  static errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
      return res.status(400).json({ status: "fail", data: err.issues });
    } else if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(err.errors && { data: err.errors }),
      });
    } else if (err.name === "SyntaxError") {
      return res.status(err.statusCode).json({
        status: "fail",
        message: err.message,
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = ErrorMiddleware;
