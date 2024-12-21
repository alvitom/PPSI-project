class AsyncHandler {
  static wrap(fn) {
    return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err));
    };
  }
}

module.exports = AsyncHandler;
