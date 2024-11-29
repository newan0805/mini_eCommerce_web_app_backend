// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token)
//     return res.status(401).json({ error: "Access denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.vendor = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: "Invalid token." });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1]; // Extract token after "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token
    req.user = decoded; // Attach user data to req.user
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
