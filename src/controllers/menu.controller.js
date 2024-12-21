const MenuService = require("../services/menu.service");
const ApiResponse = require("../utils/ApiResponse");

class MenuController {
  static async createMenu(req, res) {
    const { name, description, price, category, quantity } = req.body;
    const image = req.file;

    const data = await MenuService.createMenu({ name, description, price, category, quantity, image });

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
