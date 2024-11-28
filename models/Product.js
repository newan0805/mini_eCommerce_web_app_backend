const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    description: { type: String },
    images: [{ url: String, isThumbnail: Boolean }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
