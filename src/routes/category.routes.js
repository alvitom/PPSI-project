const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const CategoryController = require("../controllers/category.controller");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(CategoryController.createCategory));

router.get("/", AsyncHandler.wrap(CategoryController.getCategories));
router.get("/:name", AsyncHandler.wrap(CategoryController.getCategory));

router.put("/:name", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(CategoryController.updateCategory));

router.delete("/:name", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(CategoryController.deleteCategory));

module.exports = router;
