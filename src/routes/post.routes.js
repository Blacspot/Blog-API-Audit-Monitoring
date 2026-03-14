const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { protect, optionalProtect } = require("../middleware/auth.middleware");
const auditLogger = require("../middleware/audit.middleware");

router.post("/", protect, auditLogger('post'), postController.createPost);
router.get("/", optionalProtect, auditLogger('post'), postController.getPosts);
router.get("/:id", optionalProtect, auditLogger('post'), postController.getPostById);
router.put("/:id", protect, auditLogger('post'), postController.updatePost);
router.delete("/:id", protect, auditLogger('post'), postController.deletePost);

module.exports = router;