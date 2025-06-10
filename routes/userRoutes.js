const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");
const tokenValidate = require("../middleware/validateUser");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", tokenValidate, currentUser);

module.exports = router;
