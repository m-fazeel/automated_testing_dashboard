import express from 'express';
import * as controllers from '../controllers/controllers.js';

const router = express.Router();

// get the complete data from the database in a single url 
router.get('/workflowrun', controllers.WorkflowRunData);
router.get('/repository', controllers.RepositoryData);
router.get('/users', controllers.UsersData);
router.get('/testresult', controllers.TestResultData);
router.get('/metrics', controllers.getMetrics);


export default router;