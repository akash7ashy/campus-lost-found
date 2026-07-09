require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require(
  "./routes/authRoutes"
);

const itemRoutes = require(
  "./routes/itemRoutes"
);

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", authRoutes);

app.use("/items", itemRoutes);





const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});












// for now we create to use the all the routes in the server.js but we seperate into two and use it now 

/*require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Item = require("./models/Item");
const upload = require("./config/multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const authMiddleware = require("./middleware/authMiddleware");
const app = express();


app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// GET all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST new item
app.post("/items", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const newItem = await Item.create({
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      status: req.body.status,
      email: req.body.email,
      mobile: req.body.mobile,
      userId: req.user.id,
      // Cloudinary URL
      image: req.file ? req.file.path : "",
    });

    res.json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



// REGISTER USER
app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Create JWT token
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
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// delete post 
app.delete(
  "/items/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const item = await Item.findById(
        req.params.id
      );

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      // Check ownership
      if (
        item.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      await Item.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Item deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Resolved route
app.put(
  "/items/:id/resolve",
  authMiddleware,
  async (req, res) => {
    try {
      const item = await Item.findById(
        req.params.id
      );

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      // Only owner can update
      if (
        item.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      item.status = "Resolved";

      await item.save();

      res.json({
        message: "Item marked as resolved",
        item,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// edit the post 

app.put(
  "/items/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const item = await Item.findById(
        req.params.id
      );

      if (!item) {
        return res.status(404).json({
          message: "Item not found",
        });
      }

      if (
        item.userId.toString() !==
        req.user.id
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      item.title = req.body.title;
      item.category = req.body.category;
      item.location = req.body.location;
      item.email = req.body.email;
      item.mobile = req.body.mobile;

      // Update image only if a new image is selected
      if (req.file) {
        item.image = req.file.path;
      }

      await item.save();

      res.json({
        message: "Item updated successfully",
        item,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});*/














/*require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Item = require("./models/Item");

const app = express();


app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI

)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// GET all items
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST new item
app.post("/items", async (req, res) => {
  try {
    const newItem = await Item.create(req.body);

    res.json({
      message: "Item added successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});*/