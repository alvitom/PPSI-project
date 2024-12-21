const CategoryService = require("../services/category.service");
const ApiResponse = require("../utils/ApiResponse");

class CategoryController {
  static async createCategory(req, res) {
    const { name } = req.body;

    const data = await CategoryService.createCategory(name);

    ApiResponse.success(res, 201, "success", "Category created successfully", data);
  }

  static async getCategories(_, res) {
    const data = await CategoryService.getCategories();

    ApiResponse.success(res, 200, "success", "Categories fetched successfully", data);
  }
}

module.exports = CategoryController;
