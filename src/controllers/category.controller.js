const CategorySchema = require("../schemas/category");
const CategoryService = require("../services/category.service");
const ApiResponse = require("../utils/apiResponse");

class CategoryController {
  static async createCategory(req, res) {
    const payload = req.body;

    CategorySchema.create().parse(payload);

    const { name } = payload;

    const data = await CategoryService.createCategory(name);

    ApiResponse.success(res, 201, "success", "Category created successfully", data);
  }

  static async getCategories(_, res) {
    const data = await CategoryService.getCategories();

    ApiResponse.success(res, 200, "success", "Categories fetched successfully", data);
  }

  static async getCategory(req, res) {
    const { name } = req.params;

    const data = await CategoryService.getCategory(name);

    ApiResponse.success(res, 200, "success", "Category fetched successfully", data);
  }

  static async updateCategory(req, res) {
    const payload = req.body;
    const { name } = req.params;

    CategorySchema.update().parse(payload);

    const data = await CategoryService.updateCategory(name, payload);

    ApiResponse.success(res, 200, "success", "Category updated successfully", data);
  }

  static async deleteCategory(req, res) {
    const { name } = req.params;

    const data = await CategoryService.deleteCategory(name);

    ApiResponse.success(res, 200, "success", "Category deleted successfully", data);
  }
}

module.exports = CategoryController;
