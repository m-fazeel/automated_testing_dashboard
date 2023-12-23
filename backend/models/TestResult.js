import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema({
    testName: String,
    status: String, // e.g., "passed", "failed"
    executionTime: Number,
    errorMessage: String,
    workflowRun: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkflowRun' },
    timestamp: { type: Date, default: Date.now }
  });
  const TestResult = mongoose.model('TestResult', testResultSchema);
export default TestResult;  