import xml2js from 'xml2js';
import TestResult from '../models/TestResult.js';
import WorkflowRun from '../models/WorkflowRun.js';

const parseTestResults = async (xmlData, workflowRunId) => {
    const parser = new xml2js.Parser();
    // console.log(xmlData);

    try {
        const result = await parser.parseStringPromise(xmlData);
        const totalTests = parseInt(result.testsuite.$.tests);
        const failedTests = parseInt(result.testsuite.$.failures);
        const passedTests = totalTests - failedTests;
        const totalTime = parseFloat(result.testsuite.$.time);

        // Update WorkflowRun document with summary metrics
        await WorkflowRun.findByIdAndUpdate(workflowRunId, {
            $inc: {
                'metrics.totalTests': totalTests,
                'metrics.passedTests': passedTests,
                'metrics.failedTests': failedTests,
                'metrics.totalTime': totalTime
            }
        });

        // Create TestResult documents for each test case
        for (const testCase of result.testsuite.testcase) {
            const testName = testCase.$.name;
            const executionTime = parseFloat(testCase.$.time);
            const status = testCase.failure ? 'failed' : 'passed';

            const newTestResult = new TestResult({
                testName,
                status,
                executionTime,
                workflowRun: workflowRunId


            });
            await newTestResult.save();
        }

    } catch (err) {
        console.error('Error parsing XML:', err);
    }
};

export default parseTestResults;
