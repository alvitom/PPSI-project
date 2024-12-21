const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const CategoryController = require("../controllers/category.controller");

const router = Router();

router.post("/", AsyncHandler.wrap(CategoryController.createCategory));

router.get("/", AsyncHandler.wrap(CategoryController.getCategories));

module.exports = router;