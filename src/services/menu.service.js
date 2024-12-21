const MenuModel = require("../models/menu");
const CategoryModel = require("../models/category");
const { v4: uuid4 } = require("uuid");
const { uploadFile } = require("../utils/fileUploader");
const DatabaseError = require("../exceptions/DatabaseError");
const NotFoundError = require("../exceptions/NotFoundError");

class MenuService {
  static async createMenu(data) {
    const { name, description, price, category, quantity, image } = data;

    const findCategory = await CategoryModel.findByName(category);

    if (!findCategory) {
      throw new NotFoundError("Category not found");
    }

    const findMenu = await MenuModel.findByName(name);

    if (findMenu) {
      throw new DatabaseError("Menu already exists");
    }

    const categoryId = findCategory.id;
    const priceFormatted = parseInt(price);
    const quantityFormatted = parseInt(quantity);
    const imageFile = image.filename;

    const filePath = `public/images/menus/${imageFile}`;
    const destFileName = `images/menus/${imageFile}`;

    const imageURL = await uploadFile(filePath, destFileName);

    await MenuModel.create({ name, description, price: priceFormatted, category_id: categoryId, quantity: quantityFormatted, image: imageURL });

    const menu = await MenuModel.findByName(name);

    const payload = {
      id: uuid4(),
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      quantity: menu.quantity,
      image: menu.image,
      rating: menu.rating,
      createdAt: menu.created_at,
      updatedAt: menu.updated_at,
    };

    return payload;
  }

  static async getMenus(limit, offset, search, category) {
    if (category) {
      const findCategory = await CategoryModel.findByName(category);

      if (!findCategory) {
        throw new NotFoundError("Category not found");
      }
    }

    const [menus, total] = await Promise.all([MenuModel.find(limit, offset, search, category), MenuModel.count(search, category)]);

    const totalPages = Math.ceil(total / limit);

    menus.map((menu) => (menu.id = uuid4()));

    const payload = {
      menus: menus,
      totalItems: total,
      itemsPerPage: limit,
      totalPages: totalPages > 0 ? totalPages : 1,
      currentPage: offset / limit + 1,
      previousPage: offset > 0 ? offset / limit : null,
      nextPage: offset + limit < total ? offset / limit + 1 : null,
    };

    return payload;
  }

  static async getMenu(name) {
    const menu = await MenuModel.findByName(name);

    if (!menu) {
      throw new NotFoundError("Menu not found");
    }

    const payload = {
      id: uuid4(),
      name: menu.name,
      description: menu.description,
      price: menu.price,
      category: menu.category,
      quantity: menu.quantity,
      image: menu.image,
      rating: menu.rating,
      createdAt: menu.created_at,
      updatedAt: menu.updated_at,
    };

    return payload;
  }
}

module.exports = MenuService;
