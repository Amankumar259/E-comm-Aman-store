import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only"), false);
  }
};

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.file) {
      // ✅ BUILD FULL IMAGE URL
      // In production: https://e-comm-aman-store-1.onrender.com/uploads/image-123456.jpg
      // In development: http://localhost:5000/uploads/image-123456.jpg
      const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
      const backendUrl =
        process.env.BACKEND_URL || `${protocol}://localhost:5000`;
      const imageUrl = `${backendUrl}/${req.file.path}`;

      res.status(200).send({
        message: "Image uploaded successfully",
        image: imageUrl, // ✅ Full URL instead of relative path
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
