const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User signup successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User signup failed",
      error: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter both email and password",
      });
    }

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password or email",
      });
    }

    const token = jwt.sign({ userId: user._id }, "ABKCSKY", {
      expiresIn: "30s",
    });
    const refreshToken = jwt.sign({ userId: user._id }, "ABKCSKY", {
      expiresIn: "1d",
    });

    res.status(200).json({
      data: user,
      token,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "User login failed",
      error: error.message,
    });
  }
};
