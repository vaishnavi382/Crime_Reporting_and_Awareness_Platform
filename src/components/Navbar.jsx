import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, User, LogOut } from 'lucide-react';
import { useReports } from '../context/ReportContext';

const Navbar = () => {
  const location = useLocation();
  const { user, switchRole } = useReports();

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <Shield size={24} />
          </div>
          CRAP System
        </Link>

        <ul className="navbar-nav">
          <li>
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/awareness" className={`nav-link ${location.pathname === '/awareness' ? 'active' : ''}`}>
              Awareness
            </Link>
          </li>
          
          {user && user.role === 'citizen' && (
            <>
              <li>
                <Link to="/report" className={`nav-link ${location.pathname === '/report' ? 'active' : ''}`}>
                  Report Crime
                </Link>
              </li>
              <li>
                <Link to="/user-dashboard" className={`nav-link ${location.pathname === '/user-dashboard' ? 'active' : ''}`}>
                  Dashboard
                </Link>
              </li>
            </>
          )}

          {user && user.role === 'authority' && (
            <li>
              <Link to="/authority-dashboard" className={`nav-link ${location.pathname === '/authority-dashboard' ? 'active' : ''}`}>
                Authority Dashboard
              </Link>
            </li>
          )}

          <li>
            <Link to="/sos" className="btn btn-danger btn-sm" style={{ padding: '0.3rem 0.6rem' }}>
              <AlertTriangle size={16} /> SOS
            </Link>
          </li>
        </ul>

        {/* Demo Role Switcher */}
        <div className="role-switcher">
          <span style={{color: '#94a3b8', marginRight: '0.25rem'}}>Demo:</span>
          <button 
            className={`role-btn ${user?.role === 'citizen' ? 'active' : ''}`}
            onClick={() => switchRole('citizen')}
          >
            Citizen
          </button>
          <button 
            className={`role-btn ${user?.role === 'authority' ? 'active' : ''}`}
            onClick={() => switchRole('authority')}
          >
            Authority
          </button>
          {user ? (
            <button className="role-btn" onClick={() => switchRole(null)} title="Logout">
              <LogOut size={14} />
            </button>
          ) : (
            <Link to="/login" className="role-btn">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
