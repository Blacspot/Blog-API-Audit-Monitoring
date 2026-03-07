const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/posts-per-category", analyticsController.postsPerCategory);
router.get("/posts-per-month", analyticsController.postsPerMonth);

module.exports = router;