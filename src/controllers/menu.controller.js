const fs = require("fs");
const MenuSchema = require("../schemas/menu");
const MenuService = require("../services/menu.service");
const ApiResponse = require("../utils/ApiResponse");
const { ZodError } = require("zod");

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
}

module.exports = MenuController;
