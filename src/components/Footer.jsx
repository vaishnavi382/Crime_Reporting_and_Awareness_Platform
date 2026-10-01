import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/mockData';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-col">
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} className="brand-icon" style={{ padding: '0.2rem' }} />
              CRAP System
            </h4>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#94a3b8' }}>
              Crime Reporting and Awareness Platform. A civic tech initiative empowering citizens and assisting law enforcement through transparent, rapid reporting.
            </p>
            <Link to="/sos" className="btn btn-danger btn-sm">
              <PhoneCall size={14} /> Emergency SOS
            </Link>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/report">Report a Crime</Link>
              <Link to="/awareness">Awareness Dashboard</Link>
              <Link to="/login">Citizen Login</Link>
            </div>
          </div>

          <div className="footer-col">
            <h4>Emergency Dial</h4>
            <div className="footer-links">
              {EMERGENCY_CONTACTS.slice(0, 4).map(contact => (
                <div key={contact.number} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: '#cbd5e1' }}>{contact.title}</span>
                  <strong style={{ color: '#fca5a5' }}>{contact.number}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Legal & Privacy</h4>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Anonymity Protocol</a>
              <a href="#">Law Enforcement Portal</a>
            </div>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CRAP System. For demonstration purposes only.</p>
          <p>Mock Application v1.0.0</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
