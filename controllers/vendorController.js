const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerVendor = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ error: "Vendor already exists" });
    }

    const vendor = new Vendor({ name, email, password });
    await vendor.save();

    res.status(201).json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      token: generateToken(vendor._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginVendor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const vendor = await Vendor.findOne({ email });
    if (vendor && (await bcrypt.compare(password, vendor.password))) {
      res.status(200).json({
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        token: generateToken(vendor._id),
      });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVendorProfile = [authMiddleware, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user.id).select("-password");

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];
