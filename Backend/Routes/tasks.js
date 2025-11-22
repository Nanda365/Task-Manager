const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');
const auditController = require('../Controllers/auditController');

const logTaskAction = (actionType) => (req, res, next) => {
    auditController.addAuditLog(actionType, req.params.id || req.body.id || 'N/A', 'Task', 'user-123', req.body);
    next();
};

router.get('/', taskController.getAllTasks);

router.get('/:id', taskController.getTaskById);

router.post('/', logTaskAction('TASK_CREATED'), taskController.createTask);

router.put('/:id', logTaskAction('TASK_UPDATED'), taskController.updateTask);

router.delete('/:id', logTaskAction('TASK_DELETED'), taskController.deleteTask);

module.exports = router;
