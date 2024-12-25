const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const CategoryController = require("../controllers/category.controller");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(CategoryController.createCategory));

router.get("/", AsyncHandler.wrap(CategoryController.getCategories));

module.exports = router;
