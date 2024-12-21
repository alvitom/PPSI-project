const DatabaseError = require("../exceptions/DatabaseError");
const CategoryModel = require("../models/category");
const { v4: uuid4 } = require("uuid");

class CategoryService {
  static async createCategory(name) {
    const findCategory = await CategoryModel.findByName(name);

    if (findCategory) {
      throw new DatabaseError("Category already exists");
    }

    await CategoryModel.create({ name });

    const category = await CategoryModel.findByName(name);

    const payload = {
      id: uuid4(),
      name: category.name,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
    };

    return payload;
  }

  static async getCategories() {
    const categories = await CategoryModel.find();

    categories.map((category) => (category.id = uuid4()));

    const payload = {
      categories: categories,
    };

    return payload;
  }
}

module.exports = CategoryService;
