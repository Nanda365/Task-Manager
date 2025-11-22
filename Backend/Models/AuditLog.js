const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true,
        trim: true,
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    entityType: {
        type: String,
        required: false,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        default: 'system',
    },
    details: {
        type: Object,
        default: {},
    },
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
