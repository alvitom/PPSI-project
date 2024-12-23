const { Router } = require("express");
const AsyncHandler = require("../utils/asyncHandler");
const OrderController = require("../controllers/order.controller");

const router = Router();

router.post("/", AsyncHandler.wrap(OrderController.createOrder));

router.get("/", AsyncHandler.wrap(OrderController.getOrders));
router.get("/:transactionCode", AsyncHandler.wrap(OrderController.getOrder));

router.patch("/:transactionCode", AsyncHandler.wrap(OrderController.updateOrderStatus));

module.exports = router;
