const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    action:      { type: String, required: true },
    resource:    { type: String, required: true },
    resourceId:  { type: mongoose.Schema.Types.ObjectId, default: null },
    method:      { type: String, required: true },
    endpoint:    { type: String, required: true },
    status:      { type: Number },
    ipAddress:   { type: String },
    before:      { type: mongoose.Schema.Types.Mixed, default: null },
    after:       { type: mongoose.Schema.Types.Mixed, default: null },
    isSuspicious:{ type: Boolean, default: false },
    alertType:   { type: String, default: null },
    timestamp:   { type: Date, default: Date.now }
}, {
    // Immutability: disable update and delete at the schema level
    strict: true
});

// Prevent updates and deletes
auditLogSchema.pre(['updateOne', 'findOneAndUpdate', 'findOneAndDelete', 'deleteOne', 'deleteMany'], function() {
    throw new Error('Audit logs are immutable and cannot be modified or deleted.');
});

module.exports = mongoose.model('AuditLog', auditLogSchema);