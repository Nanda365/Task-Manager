const AuditLog = require('../Models/AuditLog');

const addAuditLog = async (action, entityId, entityType, userId = 'system', details = {}) => {
    const log = new AuditLog({
        action,
        entityId: entityId === 'N/A' ? null : entityId,
        entityType,
        userId,
        details,
    });
    try {
        await log.save();
    } catch (err) {
        console.error('Failed to save audit log:', err.message);
    }
};

exports.getAllAuditLogs = async (req, res) => {
    try {
        const auditLogs = await AuditLog.find().sort({ timestamp: -1 });
        res.json(auditLogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addAuditLog = addAuditLog;
