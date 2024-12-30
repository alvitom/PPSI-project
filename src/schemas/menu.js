const { z } = require("zod");

class MenuSchema {
  static create() {
    return z
      .object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(30, { message: "Name must be less than 30 characters long" }),
        description: z
          .string({ required_error: "Description is required", invalid_type_error: "Description must be a string" })
          .min(3, { message: "Description must be at least 3 characters long" })
          .max(300, { message: "Description must be less than 300 characters long" }),
        price: z.number({ required_error: "Price is required", invalid_type_error: "Price must be a number" }).int().positive({ message: "Price must be greater than 0" }).max(100000, { message: "Price must be less than 100000" }),
        category: z
          .string({ required_error: "Category is required", invalid_type_error: "Category must be a string" })
          .min(3, { message: "Category must be at least 3 characters long" })
          .max(20, { message: "Category must be less than 20 characters long" }),
        quantity: z.number({ required_error: "Quantity is required", invalid_type_error: "Quantity must be a number" }).int().positive({ message: "Quantity must be greater than 0" }).max(100, { message: "Quantity must be less than 100" }),
      })
      .strict();
  }

  static update() {
    return z
      .object({
        name: z.string({ invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(30, { message: "Name must be less than 30 characters long" }),
        description: z
          .string({ invalid_type_error: "Description must be a string" })
          .min(3, { message: "Description must be at least 3 characters long" })
          .max(300, { message: "Description must be less than 300 characters long" })
          ,
        price: z.number({ invalid_type_error: "Price must be a number" }).int().positive({ message: "Price must be greater than 0" }).max(100000, { message: "Price must be less than 100000" }),
        category: z.string({ invalid_type_error: "Category must be a string" }).min(3, { message: "Category must be at least 3 characters long" }).max(20, { message: "Category must be less than 20 characters long" }),
        quantity: z.number({ invalid_type_error: "Quantity must be a number" }).int().positive({ message: "Quantity must be greater than 0" }).max(100, { message: "Quantity must be less than 100" }),
      })
      .strict();
  }
}

module.exports = MenuSchema;
