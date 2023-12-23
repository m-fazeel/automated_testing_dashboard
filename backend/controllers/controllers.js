import express from 'express';
import WorkflowRun from '../models/WorkflowRun.js';
import Repository from '../models/Repository.js';
import Users from '../models/User.js';
import TestResult from '../models/TestResult.js';


export const WorkflowRunData = async (req, res) => {
    try {
        const workflowRuns = await WorkflowRun.find();
        
        const transformedData = workflowRuns.map(run => ({
            number: run.runId,
            date: run.startTime ? run.startTime.toISOString().split('T')[0] : 'No Date',
            status: run.status,
            totalTests: run.metrics.totalTests,
            passed: run.metrics.passedTests,
            failed: run.metrics.failedTests,
            // round it 3 decimal places
            totalTime: Math.round(run.metrics.totalTime * 1000) / 1000,
        }));

        res.json(transformedData);
    
        } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const RepositoryData = async (req, res) => {
    try {
        const repositories = await Repository.find();
        res.status(200).json(repositories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const UsersData = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const TestResultData = async (req, res) => {
    try {
        const testResults = await TestResult.find();
        res.status(200).json(testResults);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Total Repositories, Total Workflows, Total Tests Run, Average Build Time
// pass/fail ratio
export const getMetrics = async (req, res) => {
    try {
        const totalRepositories = await Repository.countDocuments();
        const totalWorkflows = await WorkflowRun.countDocuments();
        const totalTestsRun = await TestResult.countDocuments();

        const workflowRuns = await WorkflowRun.find();
        const totalTime = workflowRuns.reduce((total, run) => total + run.metrics.totalTime, 0);
        // round it 3 decimal places
        const averageBuildTime = Math.round((totalTime / totalWorkflows) * 1000) / 1000;
        const passedTests = workflowRuns.reduce((total, run) => total + run.metrics.passedTests, 0);
        const failedTests = workflowRuns.reduce((total, run) => total + run.metrics.failedTests, 0);
        const totalTests = passedTests + failedTests;
        const passRatio = passedTests / totalTests;
        const failRatio = failedTests / totalTests;
        
        res.status(200).json({
            totalRepositories,
            totalWorkflows,
            totalTestsRun,
            averageBuildTime,
            passRatio,
            failRatio,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
     
