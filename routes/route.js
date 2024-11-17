const express = require("express");
const router = express.Router();
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const { signup, login } = require("../controller/userController");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes

router.get("/test", auth, (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome to the auth dashboard",
    });
  });
  

router.get("/student-dashboard", auth, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the student dashboard",
  });
});

router.get("/admin-dashboard", auth, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the admin dashboard",
  });
});

module.exports = router;
