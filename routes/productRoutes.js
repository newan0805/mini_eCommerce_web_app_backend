const express = require("express");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsList,
} = require("../controllers/productController");
const { getFavorites, toggleFavorite } = require("../controllers/favProductsController");
// const upload = require("../middleware/upload");
const router = express.Router();

// router.post("/", addProduct);
router.get("/", getProductsList);
router.post("/", addProduct);

router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
