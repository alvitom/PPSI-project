const { z } = require("zod");

class UserSchema {
  static create() {
    return z
      .object({
        email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email format" }).max(50, { message: "Email must be less than 50 characters long" }),
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be less than 50 characters long" }),
        password: z
          .string({ required_error: "Password is required", invalid_type_error: "Password must be a string" })
          .min(8, { message: "Password must be at least 8 characters long" })
          .max(30, { message: "Password must be less than 30 characters long" })
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character" }),
        confirmPassword: z.string({ required_error: "Confirm password is required", invalid_type_error: "Confirm password must be a string" }),
      })
      .strict()
      .refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
  }

  static login() {
    return z
      .object({
        email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email format" }),
        password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
      })
      .strict();
  }

  static forgotPassword() {
    return z
      .object({
        email: z.string({ required_error: "Email is required", invalid_type_error: "Email must be a string" }).email({ message: "Invalid email format" }),
        password: z
          .string({ required_error: "Password is required", invalid_type_error: "Password must be a string" })
          .min(8, { message: "Password must be at least 8 characters long" })
          .max(30, { message: "Password must be less than 30 characters long" })
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character" }),
        confirmPassword: z.string({ required_error: "Confirm password is required", invalid_type_error: "Confirm password must be a string" }),
      })
      .strict()
      .refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
  }

  static updateProfile() {
    return z
      .object({
        name: z.string({ required_error: "Name is required", invalid_type_error: "Name must be a string" }).min(3, { message: "Name must be at least 3 characters long" }).max(50, { message: "Name must be less than 50 characters long" }),
      })
      .strict();
  }

  static changePassword() {
    return z
      .object({
        oldPassword: z.string({ required_error: "Old password is required", invalid_type_error: "Old password must be a string" }),
        newPassword: z
          .string({ required_error: "New password is required", invalid_type_error: "New password must be a string" })
          .min(8, { message: "New password must be at least 8 characters long" })
          .max(30, { message: "New password must be less than 30 characters long" })
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%^*?&()\-_=+[{\]};:,<.>|~])/, { message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character" }),
        confirmPassword: z.string({ required_error: "Confirm password is required", invalid_type_error: "Confirm password must be a string" }),
      })
      .strict()
      .refine((data) => data.newPassword === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });
  }

  static deleteProfile() {
    return z
      .object({
        password: z.string({ required_error: "Password is required", invalid_type_error: "Password must be a string" }),
      })
      .strict();
  }
}

module.exports = UserSchema;
