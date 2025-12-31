import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';

import Login from './pages/Login'; // Placeholder import

import Projects from './pages/Projects';
import Accounting from './pages/Accounting';
import Profile from './pages/Profile'; // Import Profile

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Redirect if already logged in
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Layout Wrapper
const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#F5F6FA]">
      <Sidebar />
      <div className="flex-1 ml-64 p-8 overflow-hidden">
        <Header title="Dashboard" />
        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="accounting" element={<Accounting />} />
          <Route path="profile" element={<Profile />} />
          <Route path="analysis" element={<div className="p-10 font-bold text-gray-400">Analysis Page Placeholder</div>} />
          <Route path="messages" element={<div className="p-10 font-bold text-gray-400">Messages Page Placeholder</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
