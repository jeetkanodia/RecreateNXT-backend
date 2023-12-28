const express = require("express");

//controller functions
const { loginUser, signupUser } = require("../controllers/userController");

const router = express.Router();

//login route
router.post("/login", loginUser);

//register route
router.post("/register", signupUser);

module.exports = router;
//
