const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/auth.controller');
const auditLogger = require('../middleware/audit.middleware');

router.post('/signup', auditLogger('auth'), signup);
router.post('/login', auditLogger('auth'), login);

module.exports = router;