const UserService = require("../services/user.service");
const ApiResponse = require("../utils/ApiResponse");

class UserController {
  static async register(req, res) {
    const { email, password, confirmPassword, name } = req.body;

    const data = await UserService.register({ email, password, name });

    ApiResponse.success(res, 201, "success", "User created successfully", data);
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const data = await UserService.login({ email, password });

    ApiResponse.success(res, 200, "success", "User logged in successfully", data);
  }

  static async logout(req, res) {
    const { email, token } = req.user;

    const data = await UserService.logout({ email, token });

    ApiResponse.success(res, 200, "success", "User logged out successfully", data);
  }

  static async forgotPassword(req, res) {
    const { email, password, confirmPassword } = req.body;

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

    const data = await UserService.updateProfile({ userPayload: payload, email, token });

    ApiResponse.success(res, 200, "success", "Profile updated successfully", data);
  }

  static async changePassword(req, res) {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email, token } = req.user;

    const data = await UserService.changePassword({ email, token, oldPassword, newPassword });

    ApiResponse.success(res, 200, "success", "Password changed successfully. Please login again with new password", data);
  }

  static async deleteProfile(req, res) {
    const { password } = req.body;
    const { email, token } = req.user;

    const data = await UserService.deleteProfile({ email, token, password });

    ApiResponse.success(res, 200, "success", "Profile deleted successfully", data);
  }
}

module.exports = UserController;
