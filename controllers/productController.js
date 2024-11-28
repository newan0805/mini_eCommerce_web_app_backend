const Product = require("../models/Product");

// exports.addProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.addProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { sku, name, quantity, description, price, createdBy, isFavorite } =
      req.body;

    if (
      !sku ||
      !name ||
      !quantity ||
      !description ||
      !price ||
      !createdBy ||
      isFavorite === undefined
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be filled." });
    }

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file, index) => ({
        url: `/uploads/${file.filename}` || "",
        isThumbnail: index === 0 || "",
      }));
    }

    // Create the product in the database
    const product = await Product.create({
      sku,
      name,
      quantity,
      description,
      price,
      images,
      createdBy,
      isFavorite,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

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
