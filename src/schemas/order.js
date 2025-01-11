const { z } = require("zod");

class OrderSchema {
  static create() {
    return z
      .object({
        customer: z
          .string({ required_error: "Customer is required", invalid_type_error: "Customer must be a string" })
          .min(3, { message: "Customer must be at least 3 characters long" })
          .max(50, { message: "Customer must be less than 50 characters long" }),
        items: z
          .array(
            z.object({
              name: z.string(),
              quantity: z.number().int().positive({ message: "Quantity must be greater than 0" }).max(100, { message: "Quantity must be less than 100" }),
              subtotal: z.number().int().positive({ message: "Subtotal must be greater than 0" }).max(1000000, { message: "Subtotal must be less than 1000000" }),
            })
          )
          .min(1, { message: "Order must have at least one item" }),
        total: z.number({ required_error: "Total is required", invalid_type_error: "Total must be a number" }).int().positive({ message: "Total must be greater than 0" }).max(10000000, { message: "Total must be less than 10000000" }),
      })
      .strict();
  }

  static updateOrderStatus() {
    const paymentMethodEnum = ["cash", "qris", "unsettled"];
    const statusEnum = ["pending", "completed", "cancelled"];

    return z
      .object({
        paymentMethod: z
          .string({ required_error: "Payment method is required", invalid_type_error: "Payment method must be a string" })
          .toLowerCase()
          .refine((value) => paymentMethodEnum.includes(value), { message: "Invalid payment method. Must be one of: cash, qris, unsettled" }),
        status: z
          .string({ required_error: "Status is required", invalid_type_error: "Status must be a string" })
          .toLowerCase()
          .refine((value) => statusEnum.includes(value), { message: "Invalid order status. Must be one of: pending, completed, cancelled" }),
      })
      .strict();
  }
}

module.exports = OrderSchema;
