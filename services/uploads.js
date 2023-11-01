const multer = require("multer");

const uploadFiles = () => {
  const storage = multer.memoryStorage();
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new BadRequestError("only image can be uploaded"), false);
    }
  };
  const uploads = multer({ storage: storage, fileFilter: multerFilter });
  return uploads;
};

//@desc upload multiImages or mix of images
const uploadMixImage = () =>
  uploadFiles().fields([{ name: "images", maxCount: 5 }]);

module.exports = { uploadMixImage };
