import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import PassFailPieChart from './Charts/PassFailPieChart';
import PassFailLineChart from './Charts/PassFailLineChart';
import SameDataComposedChart from './Charts/BarGraph.js';
import { FormControl, InputLabel, Select, MenuItem, useForkRef } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import WorkflowTable from './WorkflowTable';
import fetchDashboardData from '../services/apiService';
import { getWorkflowData } from '../data/WorkflowData.js';
import { getMetricsData } from '../data/metricsData.js';
import { ComposedChart, Line } from 'recharts';


const Dashboard = ({ repoOwnerName }) => {
    const currentDate = new Date().toLocaleDateString();

    const [selectedRepo, setSelectedRepo] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [dateRange, setDateRange] = useState('7days');
    const [chartData, setChartData] = useState([]); // Placeholder for chart data
    const fetchedRepositories = ['project1', 'project2', 'project3'];
    const [workflowRuns, setWorkflowRuns] = useState([]);

    const [metrics, setMetrics] = useState({
        totalRepositories: 0,
        totalWorkflows: 0,
        totalTestsRun: 0,
        averageBuildTime: 0,
        passRatio: 0,
        failRatio: 0
    });


    useEffect(() => {
        const fetchWorkflowData = async () => {
            const workflowData = await getWorkflowData();
            setWorkflowRuns(workflowData);
        };

        fetchWorkflowData();
    }
        , []);

    useEffect(() => {
        const fetchMetricsData = async () => {
            const metricsData = await getMetricsData();
            setMetrics(metricsData);
        }
        fetchMetricsData();
    }, []);


    useEffect(() => {
        // Fetch repositories and set them in state
        setRepositories(fetchedRepositories);
    }, []);

    const handleRepoChange = (event) => {
        setSelectedRepo(event.target.value);
    };

    const handleDateRangeChange = (event) => {
        setDateRange(event.target.value);
    };

    const passFailData = [
        { name: 'Pass', value: metrics.passRatio },
        { name: 'Fail', value: metrics.failRatio },
    ];

    const lineChartData = workflowRuns.map((workflow, index) => ({
        name: `${index + 1}`,
        Passed: workflow.passed,
        Failed: workflow.failed,
        Total: workflow.totalTests
    }));

    const composedChartData = workflowRuns.map((workflow, index) => ({
        name: `${index + 1}`,
        Duration: workflow.totalTime,
        Tests: workflow.totalTests
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: 'black', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <p>{`Workflow: ${label}`}</p>
                    <p>{`Duration: ${payload[0].value} mins`}</p>
                    <p>{`Tests: ${payload[1].value}`}</p>
                </div>
            );
        }

        return null;
    };


    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Hi {repoOwnerName}</Typography>
            </div>
            <Typography variant="h6" gutterBottom>Metric Overview</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="flex flex-col space-y-4">
                    <MetricBox title="Total Repositories Connected" value={metrics.totalRepositories} />

                    <MetricBox title="Average Build Time" value={metrics.averageBuildTime} />
                </div>

                <div className="flex flex-col space-y-4">
                    <MetricBox title="Total Workflows" value={metrics.totalWorkflows} />
                    <MetricBox title="Tests Run" value={metrics.totalTestsRun} />
                </div>

                <div className="flex flex-col items-center justify-center">
                    <Typography variant="h6" className="mb-2">Overall Pass/Fail Ratio</Typography>
                    <PassFailPieChart passFailData={passFailData} />
                </div>
            </div>
            <hr className="my-6"  /> 
            <div className="mt-10">
                <Typography variant="h6" gutterBottom>Workflow Details</Typography>
                <WorkflowTable workflows={workflowRuns} />


            </div>

            <div className="mt-14" >
                <Grid container spacing={2} className="mt-4">
                    <Grid item xs={12} md={6} style={{textAlign: 'center'}}>
                        <Typography variant="h6" gutterBottom align='center'>
                        Pass/Fail Trend Analysis
                        </Typography>
                        <PassFailLineChart data={lineChartData} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom align='center'>
                        Workflow Performance Overview
                        </Typography>
                        <ResponsiveContainer width="100%" height={310}>
                            <ComposedChart data={composedChartData} margin={{ top: 10, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={CustomTooltip} />
                                <Legend />
                                <Bar dataKey="Duration" barSize={20} fill="#82ca9d" />
                                <Line type="monotone" dataKey="Duration" stroke="#ff7300" />

                            </ComposedChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </div>


        </div>
    );
};

const MetricBox = ({ title, value }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const increment = value / 100.0; // Adjust the division factor for speed control
        let current = 0.0;

        const intervalId = setInterval(() => {
            current += increment;
            setDisplayValue(Math.min(current.toFixed(2), value));
        }, 10.0); // Adjust interval for speed control

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [value]);

    return (
        <Paper className="p-4 flex flex-col items-center justify-center h-32" sx={{ backgroundColor: '#322c54', color:'white' }}>
            <Typography variant="h4" className="mb-2">{displayValue}</Typography>
            <Typography variant="subtitle1">{title}</Typography>
        </Paper>
    );
};



export default Dashboard;
