const Product = require("../models/Product");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

const validateFields = (req, res, next) => {
  const { sku, name, quantity, description, price, createdBy } = req.body;

  if (
    (!sku && sku == "") ||
    !name ||
    !quantity ||
    !description ||
    price == null ||
    !createdBy
  ) {
    return res.status(400).json({
      error: "All required fields must be filled.",
      missingFields: {
        sku,
        name,
        quantity,
        description,
        price,
        createdBy,
      },
    });
  }
  next();
  //   upload;
};

exports.addProduct = [
  authMiddleware,
  //   validateFields,
  upload.array("images"),
  async (req, res) => {
    try {
      const { sku, name, quantity, description, price, isFavorite } = req.body;

      //   const images = req.files.map((file, index) => ({
      //     url: `/uploads/${file.filename}`,
      //     isThumbnail: index === 0,
      //   }));

      const images = req.files.map((file) => ({
        filename: file.filename, // Use the filename from multer
        path: `/uploads/${file.filename}`, // Construct the path to the uploaded file
        size: file.size, // File size from multer
      }));

      const product = await Product.create({
        sku,
        name,
        quantity,
        description,
        price,
        images,
        createdBy: req.user.id,
        isFavorite: isFavorite !== undefined ? isFavorite : false,
      });

      res.status(201).json(product);
    } catch (err) {
      console.error("Error: ", err);
      res.status(400).json({ error: err.message });
    }
  },
];

exports.getProductsList = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
