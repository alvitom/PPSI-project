const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const OrderController = require("../controllers/order.controller");
const AuthMiddleware = require("../middlewares/auth");

const router = Router();

router.post("/", AsyncHandler.wrap(OrderController.createOrder));

router.get("/", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(OrderController.getOrders));
router.get("/:transactionCode", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(OrderController.getOrder));

router.patch("/:transactionCode", AuthMiddleware.isAuthenticated, AsyncHandler.wrap(OrderController.updateOrderStatus));

module.exports = router;
