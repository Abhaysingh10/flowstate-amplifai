import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/**
 * Demo series for revenue and profit across months.
 * Units are in millions (M) for display.
 */
const data = [
  { name: 'Jul 24', revenue: 90, profit: 35 },
  { name: 'Aug 24', revenue: 86, profit: 32 },
  { name: 'Sep 24', revenue: 85, profit: 28 },
  { name: 'Oct 24', revenue: 84, profit: 24 },
  { name: 'Nov 24', revenue: 87, profit: 30 },
  { name: 'Dec 24', revenue: 91, profit: 33 },
  { name: 'Jan 25', revenue: 95, profit: 29 },
  { name: 'Feb 25', revenue: 88, profit: 22 },
  { name: 'Mar 25', revenue: 83, profit: 20 },
  { name: 'Apr 25', revenue: 85, profit: 26 },
  { name: 'May 25', revenue: 89, profit: 27 },
  { name: 'Jun 25', revenue: 93, profit: 28 },
];

/**
 * TrendChart
 * - Responsive two-series line chart
 * - Blue line: revenue; Red line: profit trend
 * - M-unit axis labels and tooltip formatters
 */
const TrendChart = () => {
  return (
    <div className="bg-white rounded-3 border p-3 h-100 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="fw-semibold">Revenue & Profit Trend</div>
        <button className="btn btn-sm btn-light"><i className="bi bi-arrows-fullscreen" /></button>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="M" />
            <Tooltip formatter={(v) => `${v}M`} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={false} name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="#EF4444" strokeWidth={2} dot={false} name="Profit Trend" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;
