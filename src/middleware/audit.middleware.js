const AuditLog = require('../models/auditLog.model');

const auditLogger = (resource) => {
    return async (req, res, next) => {
        const originalJson = res.json.bind(res);

        res.json = async (body) => {
            try {
                await AuditLog.create({
                    userId:     req.user?.id || null,
                    action:     req.method,
                    resource,
                    resourceId: req.params?.id || null,
                    method:     req.method,
                    endpoint:   req.originalUrl,
                    status:     res.statusCode,
                    ipAddress:  req.ip,
                    before:     req.beforeState || null,
                    after:      ['POST', 'PUT', 'PATCH'].includes(req.method) ? body : null,
                    timestamp:  new Date()
                });
            } catch (err) {
                console.error('Audit log error:', err.message);
            }
            return originalJson(body);
        };
        next();
    };
};

module.exports = auditLogger;