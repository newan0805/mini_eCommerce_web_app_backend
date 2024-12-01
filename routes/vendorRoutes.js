const express = require('express');
const { registerVendor, loginVendor, getVendorProfile } = require('../controllers/vendorController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerVendor);
router.post('/login', loginVendor);
router.get('/profile', getVendorProfile);

module.exports = router;
