const express = require("express");

const {
  createOrder,
  getMyOrders,
  getMyOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ADMIN ONLY
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  next();
};

// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);

// GET MY ORDERS
router.get(
  "/my-orders",
  protect,
  getMyOrders
);

// GET ALL ORDERS FOR ADMIN
// IMPORTANT: This must come BEFORE /:id
router.get(
  "/admin",
  protect,
  adminOnly,
  getAllOrders
);

// UPDATE ORDER STATUS FOR ADMIN
router.put(
  "/admin/:id/status",
  protect,
  adminOnly,
  updateOrderStatus
);

// GET SINGLE MY ORDER
router.get(
  "/:id",
  protect,
  getMyOrderById
);

module.exports = router;