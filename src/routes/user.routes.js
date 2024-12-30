const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const UserController = require("../controllers/user.controller");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/register", AsyncHandler.wrap(UserController.register));
router.post("/login", AsyncHandler.wrap(UserController.login));
router.post("/logout", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(UserController.logout));

router.get("/profile", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(UserController.getProfile));

router.patch("/forgot-password", AsyncHandler.wrap(UserController.forgotPassword));
router.patch("/profile", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(UserController.updateProfile));
router.patch("/change-password", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(UserController.changePassword));

router.delete("/profile", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(UserController.deleteProfile));

module.exports = router;
