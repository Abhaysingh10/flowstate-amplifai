import React from 'react';
import Sidebar from '../../components/layout/Sidebar';
import MetricCard from './components/MetricCard';
import TrendChart from './components/TrendChart';
import MarginTrends from './components/MarginTrends';
import EntityTable from './components/EntityTable';
import InsightsPanel from './components/InsightsPanel';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const metrics = [
    { title: 'Consolidated Revenue', value: '€24.5B', delta: '+12.5%', positive: true, icon: 'bi-graph-up' },
    { title: 'Net Profit', value: '€40.5M', delta: '+8.3% YoY', positive: true, icon: 'bi-cash-coin' },
    { title: 'EBITDA Margin', value: '14.6%', delta: '-3.6% YoY', positive: false, icon: 'bi-activity' },
    { title: 'Working Capital', value: '€25.7M', delta: '-3.3% YoY', positive: false, icon: 'bi-wallet2' },
  ];

  return (
    <div className="d-flex bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      <div className="flex-grow-1 p-3">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h5 className="mb-0 d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary me-1"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarCollapsed((v) => !v)}
              title="Toggle sidebar"
            >
              <i className="bi bi-layout-sidebar-inset" />
            </button>
            <span>Dashboard</span>
          </h5>
        </div>

        <div className="row g-3 mb-3">
          {metrics.map((m) => (
            <div className="col-12 col-md-6 col-lg-3" key={m.title}>
              <MetricCard {...m} />
            </div>
          ))}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-lg-8">
            <TrendChart />
          </div>
          <div className="col-12 col-lg-4">
            <MarginTrends />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-12 col-xl-8">
            <EntityTable />
          </div>
          <div className="col-12 col-xl-4">
            <InsightsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
