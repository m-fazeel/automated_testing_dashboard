import express, { json } from 'express';
import mongoose from 'mongoose';
import downloadArtifacts from './utils/githubArtifacts.js';
import getRepositoryInfo from './utils/getRepositoryInfo.js';
import addOrUpdateRepository from './utils/repositoryHandler.js';
import parseTestResults from './utils/parseTestResults.js'; // Import the parseTestResults function
import routes from './routes/routes.js';
import cors from 'cors';

import User from './models/User.js';
import Repository from './models/Repository.js';
import WorkflowRun from './models/WorkflowRun.js';
import TestResult from './models/TestResult.js';

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(json());
app.use(cors());


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

app.post('/webhook', async (req, res) => {
    if (req.body.action === 'completed' && req.body.workflow_run) {
        const workflowRunData = req.body.workflow_run;
        const runId = workflowRunData.id;
        const owner = 'm-fazeel';
        const repo = 'project-testing';
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

        // Fetch and update repository information
        const repoInfo = await getRepositoryInfo(owner, repo, GITHUB_TOKEN);
        if (!repoInfo) {
            return res.status(500).send('Failed to fetch repository information');
        }
        const repositoryId = await addOrUpdateRepository(repoInfo, owner);

        let workflowrun = await WorkflowRun.findOne({ runId });
        if (!workflowrun) {
            workflowrun = new WorkflowRun({
                runId,
                status: workflowRunData.conclusion,
                startTime: workflowRunData.created_at,
                endTime: workflowRunData.updated_at,
                repository: repositoryId
            });
            await workflowrun.save();

            await Repository.findByIdAndUpdate(repositoryId, {
                $push: { workflowRuns: workflowrun._id }
            });
        }

        // Download and parse the XML content
        const xmlContent = await downloadArtifacts(owner, repo, GITHUB_TOKEN);
        for (const xml of xmlContent) {
            console.log(xml);
            await parseTestResults(xml, workflowrun._id);
        }

        res.status(200).send('Webhook processed');
    } else {
        res.status(400).send('Webhook not processed');
    }
});

app.use('/api', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
