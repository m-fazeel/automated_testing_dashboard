import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PassFailLineChart = ({ data }) => {
    return (
        <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Passed" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Failed" stroke="#ff4d4f" />
            <Line type="monotone" dataKey="Total" stroke="#8884d8" />

        </LineChart>
    );
};

export default PassFailLineChart;
