const { Router } = require("express");
const menuRouter = require("./menu.routes");
const categoryRouter = require("./category.routes");
const orderRouter = require("./order.routes");

const router = Router();

router.use("/menus", menuRouter);
router.use("/categories", categoryRouter);
router.use("/orders", orderRouter);

module.exports = router;
