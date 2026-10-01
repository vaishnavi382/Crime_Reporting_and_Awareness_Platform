import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Activity, FileText, CheckCircle, BarChart3, Users, ChevronRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary-navy) 100%)', 
        color: 'white',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
            Live Incident Reporting System Active
          </div>
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
            Empowering Citizens.<br />Assisting Authorities.
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            A unified platform for transparent crime reporting, emergency distress signaling, and community safety awareness. Stand together for a safer tomorrow.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/report" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'white', color: 'var(--color-primary-dark)' }}>
              <FileText size={20} /> Report a Crime
            </Link>
            <Link to="/sos" className="btn btn-danger" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <ShieldAlert size={20} /> Emergency SOS
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2>How It Works</h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0' }}>Report incidents seamlessly and track them until resolution.</p>
        </div>
        
        <div className="grid-4">
          {[
            { icon: <FileText size={32} color="var(--color-accent-blue)" />, title: '1. Submit Report', desc: 'Fill out details, attach evidence, and provide location.' },
            { icon: <Activity size={32} color="var(--color-accent-blue)" />, title: '2. Triaged & Assigned', desc: 'System automatically routes the report to the nearest precinct.' },
            { icon: <Users size={32} color="var(--color-accent-blue)" />, title: '3. Authority Review', desc: 'Law enforcement investigates and updates the status.' },
            { icon: <CheckCircle size={32} color="var(--color-emerald-success)" />, title: '4. Resolution', desc: 'Incident is resolved and community stats are updated.' }
          ].map((step, idx) => (
            <div key={idx} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
              <div style={{ background: 'var(--color-accent-blue-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                {step.icon}
              </div>
              <h4 style={{ marginBottom: '0.75rem' }}>{step.title}</h4>
              <p style={{ fontSize: '0.9rem' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awareness Highlight */}
      <section style={{ background: '#ffffff', padding: '4rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-accent-blue)', fontWeight: '600', marginBottom: '1rem' }}>
                <BarChart3 size={20} /> Community Analytics
              </div>
              <h2 style={{ marginBottom: '1rem' }}>Stay Informed with Live Crime Trends</h2>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                Knowledge is your first line of defense. Access our real-time awareness dashboard to view incident distributions, high-risk zones, and preventive safety tips tailored to your region.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {['Interactive heatmaps and statistics', 'Curated personal safety guidelines', 'Monthly neighborhood safety reports'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-primary-navy)' }}>
                    <CheckCircle size={16} color="var(--color-emerald-success)" /> {item}
                  </li>
                ))}
              </ul>
              <Link to="/awareness" className="btn btn-outline">
                View Awareness Dashboard <ChevronRight size={16} />
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', borderRadius: 'var(--radius-lg)', padding: '2rem', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
                {/* Mock Chart Graphic Placeholder */}
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', gap: '10%', padding: '2rem' }}>
                  {[40, 70, 45, 90, 60, 85].map((h, i) => (
                    <div key={i} style={{ flex: 1, background: 'var(--color-accent-blue)', height: `${h}%`, borderRadius: '4px 4px 0 0', opacity: 0.8 + (i * 0.05) }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
