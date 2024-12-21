const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, path.join(__dirname, "../../public/images/menus"));
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (_, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });

const menuImgResize = async (req, _, next) => {
  if (req.file) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    await sharp(req.file.path).resize(50, 50).toFormat("jpeg").jpeg({ quality: 90 }).toFile(`public/images/menus/${req.file.fieldname}-${uniqueSuffix}.jpeg`);

    fs.unlinkSync(req.file.path);

    next();
  } /* else {
    next();
  } */
};

module.exports = { upload, menuImgResize };
