const express = require('express');
const router = express.Router();
const AuditLog = require('../models/auditLog.model');
const { protect, isAdmin } = require('../middleware/auth.middleware');

// audit routes - only accessible by admin
router.use(protect, isAdmin);

router.get('/logs', async (req, res) => {
    const logs = await AuditLog.find().sort({ timestamp: -1}).limit(100);
    res.json(logs);
});

router.get('/logs/:id', async (req,res) => {
    const log = await AuditLog.findById(req.params.id);
    if (!log) 
        return res.status(404).json({ message: "Log not found"});
    res.json(log);
});

router.get('/stats', async (req, res) => {
    const stats = await AuditLog.aggregate([
        { $group: {
            _id: "$action",
            count: { $sum: 1 }
        }}
    ]);
    res.json(stats);
});

router.get('/top-users', async (req, res) => {
    const result = await AuditLog.aggregate([
        { $match: { userId: { $ne: null}}},
        { $group: { _id: '$userId', totalActions: { $sum: 1 }}},
        { $sort: { totalActions: -1 }},
        { $limit: 5 }
    ]);
    res.json(result);
});

router.get('/activity', async (req, res) => {
    const result = await AuditLog.aggregate([
        { $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp"}},
            count: { $sum: 1 }
        }},
        { $sort: { _id: 1 }}
    ]);
    res.json(result);
});

module.exports = router;