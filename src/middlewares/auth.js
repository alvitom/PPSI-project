const AuthenticationError = require("../exceptions/AuthenticationError");
const ValidationError = require("../exceptions/ValidationError");
const JwtHandler = require("../utils/jwtHandler");

class AuthMiddleware {
  static isAuthenticated(req, _, next) {
    if (req.headers.authorization?.startsWith("Bearer ")) {
      const token = req.headers.authorization.split(" ")[1];

      try {
        const decoded = JwtHandler.verifyToken(token);
        req.user = decoded;
        req.user.token = token;
        next();
      } catch (err) {
        if (err.name === "TokenExpiredError") {
          next(new AuthenticationError("Token expired"));
        } else if (err.name === "JsonWebTokenError") {
          next(new AuthenticationError("Invalid token"));
        } else {
          next(err);
        }
      }
    } else {
      next(new ValidationError("Missing authorization header"));
    }
  }
}

module.exports = AuthMiddleware;
