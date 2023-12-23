// models/WorkflowRun.js
import mongoose from 'mongoose';

const workflowRunSchema = new mongoose.Schema({
  runId: Number,
  status: String,
  date: Date,
  startTime: Date,
    endTime: Date,
    metrics: {
        totalTests: Number,
        passedTests: Number,
        failedTests: Number,
        totalTime: Number
    },
  repository: { type: mongoose.Schema.Types.ObjectId, ref: 'Repository' }
});

const WorkflowRun = mongoose.model('WorkflowRun', workflowRunSchema);
export default WorkflowRun;
