import React from 'react';
import {
    ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const SameDataComposedChart = ({ data, CustomTooltip }) => {
    
    const renderTooltip = (props) => <CustomTooltip {...props} />;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip  content={renderTooltip}/>
                <Legend />
                <Bar dataKey="Duration" barSize={20} fill="#82ca9d" />
                <Line type="monotone" dataKey="Duration" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default SameDataComposedChart;
