const express = require("express");
const { getFavorites, toggleFavorite } = require("../controllers/favProductsController");

const router = express.Router();

router.get("/", getFavorites);
router.post("/:id", toggleFavorite);

module.exports = router;
