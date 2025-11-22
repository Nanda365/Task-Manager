const express = require('express');
const router = express.Router();
const auditController = require('../Controllers/auditController');

router.get('/', auditController.getAllAuditLogs);

module.exports = router;
