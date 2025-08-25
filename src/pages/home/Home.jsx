import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/layout/Sidebar';
import { homeActions } from './homeAction';
import { homeSelectors } from './homeReducer';

const avatarPalette = ['#6366F1', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'];

const getInitials = (fullName) => {
  const parts = String(fullName || '')
    .split(' ')
    .filter(Boolean);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase();
};

const getAvatarColor = (seed) => {
  const str = String(seed || 'X');
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarPalette.length;
  return avatarPalette[index];
};

const Home = () => {
  const dispatch = useDispatch();
  
  // Get data from Redux store using useSelector
  const companies = useSelector(homeSelectors.getPaginatedCompanies);
  const loading = useSelector(homeSelectors.isLoading);
  const exportLoading = useSelector(homeSelectors.isExportLoading);
  const searchQuery = useSelector(homeSelectors.getSearchQuery);
  const pagination = useSelector(homeSelectors.getPagination);
  const error = useSelector(homeSelectors.getError);
  const successMessage = useSelector(homeSelectors.getSuccessMessage);

  // Load companies on component mount
  useEffect(() => {
    dispatch(homeActions.fetchCompanies());
  }, [dispatch]);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    dispatch(homeActions.searchCompanies(query));
  };

  // Handle pagination
  const handlePageChange = (page) => {
    dispatch(homeActions.setPage(page));
  };

  // Handle export
  const handleExport = () => {
    dispatch(homeActions.exportCompanies());
  };

  // Handle sidebar toggle (start collapsed on small screens)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 992; // collapse by default on mobile/tablet
    }
    return false;
  });

  if (loading) {
    return (
      <div className="d-flex bg-body-tertiary" style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        <div className="flex-grow-1 p-3 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading companies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex bg-body-tertiary" style={{ minHeight: '100vh' }}>
        <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        <div className="flex-grow-1 p-3 d-flex align-items-center justify-content-center">
          <div className="text-center">
            <div className="alert alert-danger" role="alert">
              <h5>Error loading companies</h5>
              <p>{error}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => dispatch(homeActions.fetchCompanies())}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { currentPage, pageSize, totalPages, totalCount } = pagination;
  const start = (currentPage - 1) * pageSize;
  const end = Math.min(start + pageSize, totalCount);

  return (
    <div className="d-flex bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
      {/* Mobile backdrop when sidebar is open */}
      {!sidebarCollapsed && (
        <div
          className="sidebar-backdrop d-lg-none"
          onClick={() => setSidebarCollapsed(true)}
          aria-hidden
        />
      )}
      {/* Mobile-only floating toggle button */}
      <button
        type="button"
        className="btn btn-light d-lg-none mobile-sidebar-toggle"
        aria-label="Open sidebar"
        onClick={() => setSidebarCollapsed(false)}
        style={{ display: sidebarCollapsed ? 'inline-flex' : 'none' }}
      >
        <i className="bi bi-list" />
      </button>
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
            <span>List of Companies</span>
          </h5>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-secondary" 
              onClick={handleExport}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-up" /> Export
                </>
              )}
            </button>
            <button className="btn btn-primary"><i className="bi bi-plus-lg" /> Add Company</button>
          </div>
        </div>

        <div className="input-group mb-3" style={{ maxWidth: 520 }}>
          <span className="input-group-text"><i className="bi bi-search" /></span>
          <input
            className="form-control"
            placeholder="Search Companies"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button className="btn btn-outline-secondary" type="button"><i className="bi bi-sliders" /> Filter</button>
        </div>

        <div className="wheat-container p-3 rounded-3">
          <div className="pagination-bar d-flex align-items-center justify-content-end gap-3 mb-2">
            <span className="small text-muted">{start + 1}-{end} of {totalCount}</span>
            <div className="d-flex align-items-center gap-1">
              <button 
                className="btn btn-sm pager-link" 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1}
              >
                <i className="bi bi-chevron-left me-1" /> Previous
              </button>
              <button 
                className={`btn btn-sm ${currentPage === 1 ? 'pager-btn-active' : 'pager-btn'}`} 
                onClick={() => handlePageChange(1)}
              >
                1
              </button>
              {totalPages >= 2 && (
                <button 
                  className={`btn btn-sm ${currentPage === 2 ? 'pager-btn-active' : 'pager-btn'}`} 
                  onClick={() => handlePageChange(2)}
                >
                  2
                </button>
              )}
              {totalPages > 2 && <span className="px-1">…</span>}
              <button 
                className="btn btn-sm pager-link" 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
              >
                Next <i className="bi bi-chevron-right ms-1" />
              </button>
            </div>
          </div>
          <div className="table-responsive bg-white rounded shadow-sm">
            <table className="table align-middle mb-0 companies-table">
              <thead className="table-light">
                <tr>
                  <th>Company Name</th>
                  <th>CEO/Key Person</th>
                  <th>Revenue</th>
                  <th>Profit</th>
                  <th>EBITDA</th>
                  <th>Gross Margin</th>
                  <th>Key Insights</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-building text-secondary" />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span
                          className="avatar text-white"
                          style={{ backgroundColor: getAvatarColor(c.ceo) }}
                          aria-hidden
                        >
                          {getInitials(c.ceo)}
                        </span>
                        <span>{c.ceo}</span>
                      </div>
                    </td>
                    <td>{c.revenue}</td>
                    <td className={c.profit.startsWith('+') ? 'text-positive' : 'text-danger'}>
                      <i className={`bi me-1 ${c.profit.startsWith('+') ? 'bi-arrow-up-right' : 'bi-arrow-down-right'}`} />
                      {c.profit}
                    </td>
                    <td className="text-positive">
                      <i className="bi bi-graph-up-arrow me-1" />
                      {c.ebitda}
                    </td>
                    <td className="text-positive">
                      <i className="bi bi-graph-up-arrow me-1" />
                      {c.margin}
                    </td>
                    <td>
                      {c.insights.slice(0, 2).map((i) => (
                        <span key={i} className="badge text-bg-light border me-1">{i}</span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <div className="alert alert-success alert-dismissible fade show mt-3" role="alert">
            {successMessage}
            <button type="button" className="btn-close" onClick={() => dispatch(homeActions.clearSuccessMessage())}></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;



