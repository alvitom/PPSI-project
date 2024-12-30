const { v4: uuid4 } = require("uuid");
const DatabaseError = require("../exceptions/DatabaseError");
const NotFoundError = require("../exceptions/NotFoundError");
const CategoryModel = require("../models/category");

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

  static async getCategory(name) {
    const category = await CategoryModel.findByName(name);

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    const payload = {
      id: uuid4(),
      name: category.name,
      createdAt: category.created_at,
      updatedAt: category.updated_at,
    };

    return payload;
  }

  static async updateCategory(name, data) {
    const findCategory = await CategoryModel.findByName(name);

    if (!findCategory) {
      throw new NotFoundError("Category not found");
    }

    const findUpdatedCategory = await CategoryModel.findByName(data.name);

    if (findUpdatedCategory && findUpdatedCategory.id !== findCategory.id) {
      throw new DatabaseError("Category already exists");
    }

    if (findCategory.name.toLowerCase() === data.name.toLowerCase()) {
      throw new DatabaseError("Category name cannot be the same as before");
    }

    await CategoryModel.update(findCategory.id, { name: data.name });

    const updatedCategory = await CategoryModel.findByName(data.name);

    const payload = {
      id: uuid4(),
      name: updatedCategory.name,
      createdAt: updatedCategory.created_at,
      updatedAt: updatedCategory.updated_at,
    };

    return payload;
  }

  static async deleteCategory(name) {
    const findCategory = await CategoryModel.findByName(name);

    if (!findCategory) {
      throw new NotFoundError("Category not found");
    }

    await CategoryModel.delete(findCategory.id);

    const payload = null;

    return payload;
  }
}

module.exports = CategoryService;
