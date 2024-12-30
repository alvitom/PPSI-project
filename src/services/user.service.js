const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const JwtHandler = require("../utils/jwtHandler");
const DatabaseError = require("../exceptions/DatabaseError");
const NotFoundError = require("../exceptions/NotFoundError");
const AuthenticationError = require("../exceptions/AuthenticationError");
const AuthorizationError = require("../exceptions/AuthorizationError");
const ValidationError = require("../exceptions/ValidationError");

class UserService {
  static async register(data) {
    const findUser = await UserModel.findByEmail(data.email);

    if (findUser) {
      throw new DatabaseError("User already exists");
    }

    const token = JwtHandler.generateToken({ email: data.email, name: data.name });

    await UserModel.create({ ...data, token });

    const user = await UserModel.findByEmail(data.email);

    const payload = {
      id: uuid4(),
      email: user.email,
      name: user.name,
      token: token,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return payload;
  }

  static async login(data) {
    const user = await UserModel.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new AuthenticationError("Invalid credentials");
    }

    const token = JwtHandler.generateToken({ email: user.email, name: user.name });

    await UserModel.update({ token: token }, user.email);

    const updatedUser = await UserModel.findByEmail(data.email);

    const payload = {
      id: uuid4(),
      email: updatedUser.email,
      name: updatedUser.name,
      token: token,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return payload;
  }

  static async logout(data) {
    const user = await UserModel.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.token === "") {
      throw new AuthenticationError("User not logged in");
    }

    if (user?.token !== data.token) {
      throw new AuthenticationError("Invalid token");
    }

    await UserModel.update({ token: "" }, user.email);

    const updatedUser = await UserModel.findByEmail(data.email);

    const payload = {
      id: uuid4(),
      email: updatedUser.email,
      name: updatedUser.name,
      token: updatedUser.token,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return payload;
  }

  static async forgotPassword(data) {
    const user = await UserModel.findByEmail(data.email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const newPassword = await bcrypt.hash(data.password, 10);

    await UserModel.update({ password: newPassword }, user.email);

    const updatedUser = await UserModel.findByEmail(data.email);

    const payload = {
      id: uuid4(),
      email: updatedUser.email,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return payload;
  }

  static async getProfile(data) {
    const { email, token } = data;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.token === "") {
      throw new AuthenticationError("User not logged in");
    }

    if (user.token !== token) {
      throw new AuthenticationError("Invalid token");
    }

    const payload = {
      id: uuid4(),
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };

    return payload;
  }

  static async updateProfile(data) {
    const { userPayload, email, token } = data;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.token === "") {
      throw new AuthenticationError("User not logged in");
    }

    if (user.token !== token) {
      throw new AuthenticationError("Invalid token");
    }

    await UserModel.update({ ...userPayload }, email);

    const updatedUser = await UserModel.findByEmail(email);

    const payload = {
      id: uuid4(),
      email: updatedUser.email,
      name: updatedUser.name,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return payload;
  }

  static async changePassword(data) {
    const { oldPassword, newPassword, email, token } = data;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.token === "") {
      throw new AuthenticationError("User not logged in");
    }

    if (user.token !== token) {
      throw new AuthenticationError("Invalid token");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ValidationError("Invalid old password");
    }

    if (oldPassword === newPassword) {
      throw new AuthorizationError("New password must be different from old password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.update({ password: hashedPassword, token: "" }, email);

    const updatedUser = await UserModel.findByEmail(email);

    const payload = {
      id: uuid4(),
      email: updatedUser.email,
      token: updatedUser.token,
      createdAt: updatedUser.created_at,
      updatedAt: updatedUser.updated_at,
    };

    return payload;
  }

  static async deleteProfile(data) {
    const { password, email, token } = data;

    const user = await UserModel.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.token === "") {
      throw new AuthenticationError("User not logged in");
    }

    if (user.token !== token) {
      throw new AuthenticationError("Invalid token");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ValidationError("Invalid password");
    }

    await UserModel.delete(email);

    const payload = null;

    return payload;
  }
}

module.exports = UserService;
