import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useReports } from './context/ReportContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ReportCrime from './pages/ReportCrime';
import UserDashboard from './pages/UserDashboard';
import AuthorityDashboard from './pages/AuthorityDashboard';
import SOS from './pages/SOS';
import Awareness from './pages/Awareness';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useReports();
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <main className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sos" element={<SOS />} />
          <Route path="/awareness" element={<Awareness />} />
          
          <Route path="/report" element={<ReportCrime />} />
          
          <Route path="/user-dashboard" element={
            <ProtectedRoute allowedRole="citizen">
              <UserDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/authority-dashboard" element={
            <ProtectedRoute allowedRole="authority">
              <AuthorityDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
