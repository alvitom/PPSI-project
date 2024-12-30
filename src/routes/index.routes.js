const { Router } = require("express");
const userRouter = require("./user.routes");
const menuRouter = require("./menu.routes");
const categoryRouter = require("./category.routes");
const orderRouter = require("./order.routes");

const router = Router();

router.use("/users", userRouter);
router.use("/menus", menuRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

module.exports = router;
