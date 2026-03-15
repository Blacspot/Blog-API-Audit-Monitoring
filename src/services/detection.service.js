const AuditLog = require("../models/auditLog.model");

const TIME_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const getWindowStart = () => new Date(Date.now() - TIME_WINDOW_MS);

// FIRST RULE: multiple failed login attempts within 10 minutes from same IP
const checkBruteForce = async (log) => {
    if (log.endpoint !== '/api/auth/login' || log.status !== 401) return null;

    const count = await AuditLog.countDocuments({
        endpoint: '/api/auth/login',
        status: 401,
        ipAddress: log.ipAddress,
        timestamp: { $gte: getWindowStart() }
    });
    return count >= 5 ? 'BRUTE_FORCE' : null;
};

// SECOND RULE: deletion within 10 minutes by the same user
const checkMassDeletion = async (log) => {
    if (log.method !== 'DELETE' || !log.userId) return null;

    const count = await AuditLog.countDocuments({
        method: 'DELETE',
        userId: log.userId,
        timestamp: { $gte: getWindowStart() }
    });
    return count >= 5 ? 'MASS_DELETION' : null;
};

// THIRD RULE: Same user logging in from 2+ different IPs within 10 minutes
const checkIpHopping = async (log) => {
    if (log.endpoint !== '/api/auth/login' || log.status !== 200 || !log.userId) return null;

    const recentLogins = await AuditLog.distinct('ipAddress', {
        endpoint: '/api/auth/login',
        status: 200,
        userId: log.userId,
        timestamp: { $gte: getWindowStart() }
    });
    return recentLogins.length >= 2 ? 'IP_HOPPING' : null;
};

// FOURTH RULE: 30+ requests from the same user withn 10 minutes
const checkExcessiveRequests = async (log) => {
    if (!log.userId) return null;
    const count = await AuditLog.countDocuments({
        userId: log.userId,
        timestamp: { $gte: getWindowStart() }
    });
    return count >= 30 ? 'EXCESSIVE_REQUESTS' : null;
};

// THE MASTER FUNCTION - runs all rules and returns result
const analyseLog = async (log) => {
    try {
        const [bruteForce, massDeletion, ipHopping, excessiveRequests] = await Promise.all([
            checkBruteForce(log),
            checkMassDeletion(log),
            checkIpHopping(log),
            checkExcessiveRequests(log)
        ]);
        const alertType = bruteForce || massDeletion || ipHopping || excessiveRequests || null;

        return {
            isSuspicious: alertType !== null,
            alertType
        };

    } catch (error) {
        console.error('Detection error:', error.message);
        return { isSuspicious: false, alertType: null };
    }
};
module.exports = { analyseLog };