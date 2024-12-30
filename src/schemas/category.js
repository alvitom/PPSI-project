const { z } = require("zod");

class CategorySchema {
  static create() {
    return z
      .object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(20, { message: "Name must be less than 20 characters long" }),
      })
      .strict();
  }

  static update() {
    return z
      .object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(20, { message: "Name must be less than 20 characters long" }),
      })
      .strict();
  }
}

module.exports = CategorySchema;
