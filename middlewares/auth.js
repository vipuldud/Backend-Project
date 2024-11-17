const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to authenticate a user based on the JWT token
exports.auth = (req, res, next) => {
  try {
    // Retrieve token from Authorization header, query, or body
    const token =req.body.token || req.header("Authorization").replace("Bearer","");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      // Attach decoded token to the request object
      req.user = decoded; // Ensure `req.user` is populated correctly
      next();
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Middleware to authorize student users
exports.isStudent = (req, res, next) => {
  try {
    if (req.user?.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to students only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authorization error",
      error: err.message,
    });
  }
};

// Middleware to authorize admin users
exports.isAdmin = (req, res, next) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access restricted to admins only",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Authorization error",
      error: err.message,
    });
  }
};
