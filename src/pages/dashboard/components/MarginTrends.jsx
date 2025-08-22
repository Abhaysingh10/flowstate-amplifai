import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

/**
 * Demo stacked bar data for margin trends over the last 6 months.
 * Each entry tracks Revenue, Operating Expense (opex), and COGS in millions.
 */
const data = [
  { name: 'Jan', revenue: 86.6, opex: 71.2, cogs: 78.3 },
  { name: 'Feb', revenue: 84.1, opex: 69.8, cogs: 76.5 },
  { name: 'Mar', revenue: 85.6, opex: 72.1, cogs: 78.3 },
  { name: 'Apr', revenue: 82.4, opex: 68.0, cogs: 74.9 },
  { name: 'May', revenue: 88.9, opex: 70.5, cogs: 77.4 },
  { name: 'Jun', revenue: 90.2, opex: 73.3, cogs: 79.1 },
];

/**
 * MarginTrends
 * - Responsive stacked bar chart for Revenue, Opex, COGS
 * - Shows relative contributions per month with M-unit Y axis
 */
const MarginTrends = () => {
  return (
    <div className="bg-white rounded-3 border p-3 h-100 shadow-sm">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="fw-semibold"><i className="bi bi-bar-chart me-2" />Margin Trends <span className="text-muted small">(Last 6 Months)</span></div>
        <button className="btn btn-sm btn-light"><i className="bi bi-arrows-fullscreen" /></button>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="M" />
            <Tooltip formatter={(v) => `${v}M`} />
            <Legend />
            <Bar dataKey="revenue" stackId="a" fill="#3B82F6" name="Revenue" />
            <Bar dataKey="opex" stackId="a" fill="#A855F7" name="Operating Expense" />
            <Bar dataKey="cogs" stackId="a" fill="#F59E0B" name="COGS" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarginTrends;
