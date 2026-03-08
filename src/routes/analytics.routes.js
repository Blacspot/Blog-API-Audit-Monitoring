const express = require("express");
const router = express.Router();

const analyticsController = require("../controllers/analytics.controller");

router.get("/posts-per-category", analyticsController.postsPerCategory);
router.get("/posts-per-month", analyticsController.postsPerMonth);
router.get("/top-authors", analyticsController.topAuthors);
router.get("/posts-by-date", analyticsController.postsByDateRange);

module.exports = router;