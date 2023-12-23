// models/Repository.js
import mongoose from 'mongoose';

const repositorySchema = new mongoose.Schema({
    repoId: Number,
    name: String,
    ownerName: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    workflowRuns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WorkflowRun' }]
});

const Repository = mongoose.model('Repository', repositorySchema);
export default Repository;
