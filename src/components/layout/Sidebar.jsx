import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../../utils/constants';

const Sidebar = ({ collapsed, onToggle }) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = typeof collapsed === 'boolean' ? collapsed : internalCollapsed;
  const navigate = useNavigate();
  const toggle = () => {
    if (typeof onToggle === 'function') {
      onToggle(!isCollapsed);
    } else {
      setInternalCollapsed((v) => !v);
    }
  };
  const width = isCollapsed ? 72 : 240;

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/login', { replace: true });
  };

  return (
    <div className={`d-flex flex-column sidebar-dark sidebar-sticky ${!isCollapsed ? 'sidebar-open' : ''}`} style={{ width, height: '100vh', transition: 'width 150ms ease' }}>
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="fs-5 fw-bold text-white" style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {isCollapsed ? <i className="bi bi-app" aria-hidden /> : 'FlowState'}
        </div>
      </div>
      <ul className="nav nav-pills flex-column mb-auto gap-1 p-2">
        <li className="nav-item">
          <NavLink to="/dashboard" end className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white' : 'text-light opacity-75'}`}>
            <i className="bi bi-speedometer2" />
            {!isCollapsed ? <span>Dashboard</span> : null}
          </NavLink>
        </li>
        <li>
          <NavLink to="/companies" end className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white' : 'text-light opacity-75'}`}>
            <i className="bi bi-building" />
            {!isCollapsed ? <span>Companies</span> : null}
          </NavLink>
        </li>
        <li>
          <NavLink to="/insights" end className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white' : 'text-light opacity-75'}`}>
            <i className="bi bi-lightbulb" />
            {!isCollapsed ? <span>Insights</span> : null}
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" end className={({ isActive }) => `nav-link d-flex align-items-center gap-2 ${isActive ? 'active text-white' : 'text-light opacity-75'}`}>
            <i className="bi bi-gear" />
            {!isCollapsed ? <span>Settings</span> : null}
          </NavLink>
        </li>
      </ul>
      <div className="mt-auto p-2">
        <button className="btn btn-sm btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right" />
          {!isCollapsed ? <span>Logout</span> : null}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


