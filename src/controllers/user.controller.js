const UserSchema = require("../schemas/user");
const UserService = require("../services/user.service");
const ApiResponse = require("../utils/apiResponse");

class UserController {
  static async register(req, res) {
    const payload = req.body;

    UserSchema.create().parse(payload);

    const { email, name, password } = payload;

    const data = await UserService.register({ email, name, password });

    ApiResponse.success(res, 201, "success", "User created successfully", data);
  }

  static async login(req, res) {
    const payload = req.body;

    UserSchema.login().parse(payload);

    const data = await UserService.login(payload);

    ApiResponse.success(res, 200, "success", "User logged in successfully", data);
  }

  static async logout(req, res) {
    const { email, token } = req.user;

    const data = await UserService.logout({ email, token });

    ApiResponse.success(res, 200, "success", "User logged out successfully", data);
  }

  static async forgotPassword(req, res) {
    const payload = req.body;

    UserSchema.forgotPassword().parse(payload);

    const { email, password } = payload;

    const data = await UserService.forgotPassword({ email, password });

    ApiResponse.success(res, 200, "success", "Password reset successfully. Please login with new password", data);
  }

  static async getProfile(req, res) {
    const { email, token } = req.user;

    const data = await UserService.getProfile({ email, token });

    ApiResponse.success(res, 200, "success", "Profile fetched successfully", data);
  }

  static async updateProfile(req, res) {
    const payload = req.body;
    const { email, token } = req.user;

    UserSchema.updateProfile().parse(payload);

    const data = await UserService.updateProfile({ userPayload: payload, email, token });

    ApiResponse.success(res, 200, "success", "Profile updated successfully", data);
  }

  static async changePassword(req, res) {
    const payload = req.body;
    const { email, token } = req.user;

    UserSchema.changePassword().parse(payload);

    const { oldPassword, newPassword } = payload;

    const data = await UserService.changePassword({ email, token, oldPassword, newPassword });

    ApiResponse.success(res, 200, "success", "Password changed successfully. Please login again with new password", data);
  }

  static async deleteProfile(req, res) {
    const payload = req.body;
    const { email, token } = req.user;

    UserSchema.deleteProfile().parse(payload);

    const { password } = payload;

    const data = await UserService.deleteProfile({ email, token, password });

    ApiResponse.success(res, 200, "success", "Profile deleted successfully", data);
  }
}

module.exports = UserController;
