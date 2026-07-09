const express = require("express");

const Item = require("../models/Item");
const upload = require("../config/multer");
const authMiddleware = require(
  "../middleware/authMiddleware"
);
const sendEmail = require(
  "../utils/sendEmail"
);

const router = express.Router();

// GET ALL ITEMS
router.get("/", async (req, res) => {
  try {
    const items =
      await Item.find();

    res.json(items);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
});

// CREATE ITEM
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const newItem =
        await Item.create({
          title:
            req.body.title,
          category:
            req.body.category,
          location:
            req.body.location,
          status:
            req.body.status,
          email:
            req.body.email,
          mobile:
            req.body.mobile,
          userId:
            req.user.id,
          image: req.file
            ? req.file.path
            : "",
        });

      res.json({
        message:
          "Item added successfully",
        item: newItem,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// DELETE ITEM
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const item =
        await Item.findById(
          req.params.id
        );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              "Item not found",
          });
      }

      if (
        item.userId.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

      await Item.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Item deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// MARK RESOLVED
router.put(
  "/:id/resolve",
  authMiddleware,
  async (req, res) => {
    try {
      const item =
        await Item.findById(
          req.params.id
        );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              "Item not found",
          });
      }

      if (
        item.userId.toString() !== req.user.id &&
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message: "Not authorized",
        });
      }

              if (item.status === "Resolved") {
          return res.status(400).json({
            message: "Item already resolved",
          });
        }

      item.status =
        "Resolved";

      await item.save();
      await sendEmail(
  item.email,
  "Campus Lost & Found - Item Resolved",
  `
    <h2>Campus Lost & Found</h2>

    <p>Hello,</p>

    <p>
      Your item has been marked as
      <strong>Resolved</strong>.
    </p>

    <hr>

    <p>
      <strong>Title:</strong>
      ${item.title}
    </p>

    <p>
      <strong>Category:</strong>
      ${item.category}
    </p>

    <p>
      <strong>Location:</strong>
      ${item.location}
    </p>

    <p>
      <strong>Status:</strong>
      Resolved
    </p>

    <hr>

    <p>
      Thank you for using
      Campus Lost & Found.
    </p>
  `
);

      res.json({
        message:
          "Item marked as resolved",
        item,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  }
);

// EDIT ITEM
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const item =
        await Item.findById(
          req.params.id
        );

      if (!item) {
        return res
          .status(404)
          .json({
            message:
              "Item not found",
          });
      }

if (
  item.userId.toString() !== req.user.id &&
  req.user.role !== "admin"
) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

      item.title =
        req.body.title;
      item.category =
        req.body.category;
      item.location =
        req.body.location;
      item.email =
        req.body.email;
      item.mobile =
        req.body.mobile;

      if (req.file) {
        item.image =
          req.file.path;
      }

      await item.save();

      res.json({
        message:
          "Item updated successfully",
        item,
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