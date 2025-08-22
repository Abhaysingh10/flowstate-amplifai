import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../pages/dashboard/Dashboard';
import { AUTH_TOKEN_KEY } from '../utils/constants';

/**
 * Simple auth guard for protected routes.
 * - Reads an auth token from localStorage
 * - If missing, redirects to /login
 * - Otherwise renders the protected children
 */
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

/**
 * AppRouter
 * - Declares public and protected routes
 * - Public: /login
 * - Protected: /, /dashboard, /companies, /insights, /settings
 * - Wraps protected routes with RequireAuth and MainLayout
 */
const Placeholder = ({ title }) => (
  <div className="p-3">{title}</div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<RequireAuth><MainLayout><Dashboard /></MainLayout></RequireAuth>} />
        <Route path="/companies" element={<RequireAuth><MainLayout><Home /></MainLayout></RequireAuth>} />
        <Route path="/insights" element={<RequireAuth><MainLayout><Placeholder title="Insights" /></MainLayout></RequireAuth>} />
        <Route path="/settings" element={<RequireAuth><MainLayout><Placeholder title="Settings" /></MainLayout></RequireAuth>} />
        <Route path="/" element={<RequireAuth><MainLayout><Home /></MainLayout></RequireAuth>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default AppRouter;



