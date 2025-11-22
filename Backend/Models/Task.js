const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    dueDate: {
        type: Date,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

TaskSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

TaskSchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

module.exports = mongoose.model('Task', TaskSchema);
