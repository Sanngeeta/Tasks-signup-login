const express = require("express");
const { signup, userLogin } = require("../controller/user");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", userLogin);

module.exports = { router };
