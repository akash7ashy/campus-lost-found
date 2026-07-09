const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();
const adminMiddleware = require(
  "../middleware/adminMiddleware"
);
const authMiddleware = require(
  "../middleware/authMiddleware"
);

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } =
      req.body;

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const newUser =
      await User.create({
        name: fullName,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      message:
        "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email:
          newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message:
        "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email:
          user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

// GET ALL USERS
router.get("/users", authMiddleware,adminMiddleware,async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// make user to admin via the admin 
router.put(
  "/users/:id/make-admin", authMiddleware,adminMiddleware,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      user.role = "admin";

      await user.save();

      res.json({
        message:
          "User promoted to admin",
        user,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

//delete user via the admin

router.delete(
  "/users/:id", authMiddleware,adminMiddleware,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

module.exports = router;