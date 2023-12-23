// This is for the overall pass fail ratio

// src/components/PassFailPieChart.js
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const PassFailPieChart = ({ passFailData }) => {
    const COLORS = ['#3BB143', '#FF0000']; // Colors for pass and fail

    return (
        <PieChart width={400} height={240}>
            <Pie
                data={passFailData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={true}
            >
                {passFailData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default PassFailPieChart;
