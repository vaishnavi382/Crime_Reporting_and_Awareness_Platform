import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertOctagon, PhoneCall, MapPin, ShieldAlert, ArrowLeft } from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { EMERGENCY_CONTACTS } from '../data/mockData';

const SOS = () => {
  const navigate = useNavigate();
  const { triggerSOS } = useReports();
  const [sosState, setSosState] = useState('idle'); // idle, confirming, triggered
  const [countdown, setCountdown] = useState(3);
  const [sosId, setSosId] = useState('');

  const handleSOSClick = () => {
    setSosState('confirming');
    
    // Start countdown simulation
    let count = 3;
    setCountdown(count);
    
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count === 0) {
        clearInterval(interval);
        executeSOS();
      }
    }, 1000);
    
    // Add cancel mechanism on window (simplified for demo)
    window.cancelSOSInterval = interval;
  };

  const cancelSOS = () => {
    if (window.cancelSOSInterval) {
      clearInterval(window.cancelSOSInterval);
    }
    setSosState('idle');
  };

  const executeSOS = () => {
    const sos = triggerSOS();
    setSosId(sos.id);
    setSosState('triggered');
  };

  return (
    <div className="container" style={{ maxWidth: '700px', paddingBottom: '4rem' }}>
      <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem', border: 'none', paddingLeft: 0 }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-danger-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '2.5rem' }}>
          <ShieldAlert size={36} /> Emergency SOS
        </h1>
        <p style={{ fontSize: '1.1rem' }}>Trigger an immediate alert to nearest law enforcement and medical response units.</p>
        
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginTop: '1rem', color: '#b91c1c', fontSize: '0.9rem', fontWeight: '500' }}>
          <strong>DISCLAIMER:</strong> This is a prototype application. Pressing this button will NOT dispatch real emergency services. In a real emergency, please dial 112 or your local emergency number.
        </div>
      </div>

      <div className="card" style={{ padding: '3rem 2rem', textAlign: 'center', marginBottom: '3rem', border: '2px solid var(--color-danger-red)', boxShadow: '0 10px 25px -5px rgba(220, 38, 38, 0.2)' }}>
        
        {sosState === 'idle' && (
          <div>
            <button 
              onClick={handleSOSClick}
              style={{
                background: 'var(--color-danger-red)',
                color: 'white',
                border: 'none',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                fontSize: '2rem',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 0 0 10px rgba(220, 38, 38, 0.2), 0 0 0 20px rgba(220, 38, 38, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
                transition: 'transform 0.1s ease',
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <AlertOctagon size={48} style={{ marginBottom: '0.5rem' }} />
              SOS
            </button>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '400px', margin: '0 auto' }}>
              Pressing this button will transmit your live GPS location and alert nearby patrol units instantly.
            </p>
          </div>
        )}

        {sosState === 'confirming' && (
          <div>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'var(--color-amber-warning)',
              color: 'white',
              fontSize: '4rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              boxShadow: '0 0 0 10px rgba(245, 158, 11, 0.2)'
            }}>
              {countdown}
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Dispatching in {countdown} seconds...</h3>
            <button onClick={cancelSOS} className="btn btn-outline" style={{ borderColor: 'var(--color-primary-navy)', color: 'var(--color-primary-navy)' }}>
              CANCEL SOS
            </button>
          </div>
        )}

        {sosState === 'triggered' && (
          <div>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'var(--color-emerald-success)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <MapPin size={48} />
            </div>
            <h3 style={{ color: 'var(--color-emerald-success)', marginBottom: '0.5rem' }}>SOS Dispatch Active</h3>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Location coordinates successfully transmitted.</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Dispatch ID: {sosId}</p>
            
            <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'left', display: 'inline-block' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>✓ Geolocation locked</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Audio recording started</li>
                <li style={{ marginBottom: '0.5rem' }}>✓ Control room notified</li>
                <li>✓ Sector patrol unit en route (ETA: 4 mins)</li>
              </ul>
            </div>
            
            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => setSosState('idle')} className="btn btn-secondary">
                Reset Demo
              </button>
            </div>
          </div>
        )}

      </div>

      <h3 style={{ marginBottom: '1rem' }}>Direct Emergency Contacts</h3>
      <div className="grid-2">
        {EMERGENCY_CONTACTS.map((contact, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem' }}>
            <div style={{ background: 'var(--color-danger-red-light)', color: 'var(--color-danger-red)', padding: '0.75rem', borderRadius: '50%' }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.25rem' }}>{contact.number}</h4>
              <p style={{ margin: '0 0 0.25rem', fontWeight: '500', color: 'var(--color-primary-navy)' }}>{contact.title}</p>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>{contact.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SOS;
