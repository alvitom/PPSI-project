const fs = require("fs");
const MenuSchema = require("../schemas/menu");
const MenuService = require("../services/menu.service");
const ApiResponse = require("../utils/apiResponse");
const { ZodError } = require("zod");
const ValidationError = require("../exceptions/ValidationError");

class MenuController {
  static async createMenu(req, res) {
    const payload = req.body;
    const image = req.file;

    const { name, description, price, category, quantity } = payload;

    const priceFormatted = +price;
    const quantityFormatted = +quantity;

    const result = MenuSchema.create().safeParse({ ...payload, price: priceFormatted, quantity: quantityFormatted });

    if (!result.success) {
      fs.unlinkSync(image.path);
      throw new ZodError(result.error.issues);
    }

    const data = await MenuService.createMenu({ name, description, price: priceFormatted, category, quantity: quantityFormatted, image });

    ApiResponse.success(res, 201, "success", "Menu created successfully", data);
  }

  static async getMenus(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.q;
    const category = req.query.category;

    const offset = (page - 1) * limit;

    const data = await MenuService.getMenus(limit, offset, search, category);

    ApiResponse.success(res, 200, "success", "Menus fetched successfully", data);
  }

  static async getMenu(req, res) {
    const { name } = req.params;

    const data = await MenuService.getMenu(name);

    ApiResponse.success(res, 200, "success", "Menu fetched successfully", data);
  }

  static async updateMenu(req, res) {
    const { name } = req.params;
    const payload = req.body;
    const image = req.file;

    if (Object.keys(payload).length === 0 && !image) {
      throw new ValidationError("Please provide at least one field to update");
    }

    let { price, quantity } = payload;

    if (price) {
      price = +price;
    }

    if (quantity) {
      quantity = +quantity;
    }

    const result = MenuSchema.update().safeParse({ ...payload, price, quantity });

    if (!result.success) {
      if (image) {
        fs.unlinkSync(image.path);
      }
      throw new ZodError(result.error.issues);
    }

    const data = await MenuService.updateMenu(name, { ...payload, price, quantity, image });

    ApiResponse.success(res, 200, "success", "Menu updated successfully", data);
  }

  static async deleteMenu(req, res) {
    const { name } = req.params;

    const data = await MenuService.deleteMenu(name);

    ApiResponse.success(res, 200, "success", "Menu deleted successfully", data);
  }
}

module.exports = MenuController;
