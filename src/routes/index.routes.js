const { Router } = require("express");
const menuRouter = require("./menu.routes");
const categoryRouter = require("./category.routes");

const router = Router();

router.use("/menus", menuRouter);
router.use("/categories", categoryRouter);

module.exports = router;
