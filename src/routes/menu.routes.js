const { Router } = require("express");
const MenuController = require("../controllers/menu.controller");
const AsyncHandler = require("../utils/asyncHandler");
const { menuImgResize, upload } = require("../middlewares/uploadImage");

const router = Router();

router.post("/", upload.single("image"), /* menuImgResize,  */AsyncHandler.wrap(MenuController.createMenu));

router.get("/", AsyncHandler.wrap(MenuController.getMenus));
router.get("/:name", AsyncHandler.wrap(MenuController.getMenu));

module.exports = router;
