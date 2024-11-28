const express = require("express");
const {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsList,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const router = express.Router();

// router.post("/", addProduct);
router.post("/", upload.array("images", 5), addProduct);
router.get("/", getProductsList);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
