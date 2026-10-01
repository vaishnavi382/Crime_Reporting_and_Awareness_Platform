import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, Map, Info } from 'lucide-react';
import { MOCK_AWARENESS_STATS, SAFETY_TIPS } from '../data/mockData';

const Awareness = () => {
  return (
    <div className="container">
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <BarChart3 size={28} color="var(--color-accent-blue)" /> Community Awareness Dashboard
        </h2>
        <p style={{ maxWidth: '700px', margin: '0 auto' }}>Stay informed with the latest public safety analytics and localized risk prevention guidelines.</p>
        
        <div style={{ background: 'var(--color-amber-light)', border: '1px solid #fde68a', color: 'var(--color-amber-warning)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', display: 'inline-block', marginTop: '1rem', fontSize: '0.85rem', fontWeight: '500' }}>
          Note: This dashboard displays simulated mock data for demonstration purposes.
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid-4" style={{ marginBottom: '3rem' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Total Tracked Incidents</p>
          <h2 style={{ margin: 0, color: 'var(--color-primary-navy)' }}>{MOCK_AWARENESS_STATS.totalIncidentsTracked}</h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Resolution Rate</p>
          <h2 style={{ margin: 0, color: 'var(--color-emerald-success)' }}>{MOCK_AWARENESS_STATS.resolutionRatePercent}%</h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Avg. Response Time</p>
          <h2 style={{ margin: 0, color: 'var(--color-primary-navy)' }}>{MOCK_AWARENESS_STATS.avgResponseTimeMin} <span style={{fontSize: '1rem', fontWeight: 'normal'}}>min</span></h2>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ margin: '0 0 0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Active Patrols</p>
          <h2 style={{ margin: 0, color: 'var(--color-accent-blue)' }}>{MOCK_AWARENESS_STATS.activePatrolsCount}</h2>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '3rem', gap: '2rem' }}>
        {/* Crime Category Distribution (CSS Bar Chart) */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <TrendingUp size={20} /> Incident Distribution (YTD)
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_AWARENESS_STATS.categoryDistribution.map((item, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: '500' }}>
                  <span>{item.category}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{item.percent}%</span>
                </div>
                <div style={{ width: '100%', background: '#f1f5f9', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, background: item.color, height: '100%', borderRadius: '4px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk Zones */}
        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Map size={20} /> Regional Insights
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MOCK_AWARENESS_STATS.highAwarenessZones.map((zone, idx) => (
              <div key={idx} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: '#f8fafc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0 }}>{zone.zone}</h4>
                  <span className={`badge ${zone.riskLevel === 'High' ? 'badge-priority-high' : zone.riskLevel === 'Moderate' ? 'badge-priority-medium' : 'badge-priority-low'}`}>
                    {zone.riskLevel} Risk
                  </span>
                </div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--color-primary-navy)' }}><strong>Primary Issue:</strong> {zone.mainIssue}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-emerald-success)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <ShieldCheck size={14} /> Action taken: {zone.resolution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Guidelines */}
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Info size={24} color="var(--color-accent-blue)" /> Safety & Prevention Guidelines
      </h3>
      
      <div className="grid-3">
        {SAFETY_TIPS.map((section, idx) => (
          <div key={idx} className="card" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
            <h4 style={{ margin: '0 0 1rem', color: 'var(--color-primary-navy)' }}>{section.title}</h4>
            <ul style={{ paddingLeft: '1.2rem', margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--color-text-main)' }}>
              {section.tips.map((tip, tIdx) => (
                <li key={tIdx} style={{ lineHeight: '1.5' }}>{tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awareness;
