import React, { useState, useMemo } from 'react';
import { Shield, AlertTriangle, AlertCircle, FileText, CheckCircle, Clock, Eye, X, Filter } from 'lucide-react';
import { useReports } from '../context/ReportContext';

const AuthorityDashboard = () => {
  const { reports, updateReportStatus, sosAlerts, user } = useReports();
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);

  const filteredReports = useMemo(() => {
    if (statusFilter === 'All') return reports;
    return reports.filter(r => r.status === statusFilter);
  }, [reports, statusFilter]);

  const stats = useMemo(() => {
    return {
      pending: reports.filter(r => r.status === 'Pending').length,
      underReview: reports.filter(r => r.status === 'Under Review').length,
      resolved: reports.filter(r => r.status === 'Resolved').length,
      sosActive: sosAlerts.length
    };
  }, [reports, sosAlerts]);

  const getBadgeClass = (status) => {
    switch(status) {
      case 'Pending': return 'badge badge-pending';
      case 'Under Review': return 'badge badge-under-review';
      case 'Resolved': return 'badge badge-resolved';
      default: return 'badge';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'High': return 'badge badge-priority-high';
      case 'Medium': return 'badge badge-priority-medium';
      case 'Low': return 'badge badge-priority-low';
      default: return 'badge';
    }
  };

  const handleUpdateStatus = (newStatus) => {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, newStatus, `Authority marked status as ${newStatus}.`);
    // Update local modal state to reflect change immediately
    setSelectedReport(prev => ({
      ...prev,
      status: newStatus,
      notes: [...prev.notes, { timestamp: 'Just now', text: `Authority marked status as ${newStatus}.` }]
    }));
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <Shield size={28} color="var(--color-primary-dark)" />
          <h2 style={{ margin: 0 }}>Authority Command Center</h2>
        </div>
        <p>Logged in as: <strong>{user?.name}</strong> ({user?.badgeNumber || 'Admin'})</p>
      </div>

      {/* SOS Alerts Banner - High Priority */}
      {sosAlerts.length > 0 && (
        <div style={{ background: 'var(--color-danger-red-light)', border: '1px solid #fecaca', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '2.5rem' }}>
          <h3 style={{ color: 'var(--color-danger-red)', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={20} /> Active SOS Dispatches ({sosAlerts.length})
          </h3>
          <div className="grid-2">
            {sosAlerts.map(sos => (
              <div key={sos.id} style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--color-danger-red)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--color-danger-red)' }}>{sos.id}</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(sos.timestamp).toLocaleTimeString()}</span>
                </div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', fontWeight: '500' }}>{sos.location}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-priority-high">{sos.status}</span>
                  <button className="btn btn-outline btn-sm">Dispatch Sent</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-danger-red-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <AlertCircle size={24} color="var(--color-danger-red)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Active SOS</p>
            <h2 style={{ margin: 0 }}>{stats.sosActive}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-amber-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <Clock size={24} color="var(--color-amber-warning)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Pending Triage</p>
            <h2 style={{ margin: 0 }}>{stats.pending}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-accent-blue-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <FileText size={24} color="var(--color-accent-blue)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Under Review</p>
            <h2 style={{ margin: 0 }}>{stats.underReview}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-emerald-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <CheckCircle size={24} color="var(--color-emerald-success)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Resolved (Total)</p>
            <h2 style={{ margin: 0 }}>{stats.resolved}</h2>
          </div>
        </div>
      </div>

      {/* Reports Feed */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Incident Reports Queue</h3>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Filter size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <select 
                className="form-select" 
                style={{ paddingLeft: '2.2rem', width: '200px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Reports</option>
                <option value="Pending">Requires Triage (Pending)</option>
                <option value="Under Review">Active Investigations</option>
                <option value="Resolved">Closed / Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID / Time</th>
                <th>Incident & Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map(report => (
                <tr key={report.id} style={{ background: report.status === 'Pending' ? 'var(--color-amber-light)' : 'transparent' }}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--color-primary-navy)' }}>{report.id}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(report.dateTime).toLocaleDateString()} {new Date(report.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: '500' }}>{report.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{report.location}</div>
                  </td>
                  <td>
                    <span className={getPriorityBadgeClass(report.priority)}>{report.priority}</span>
                  </td>
                  <td>
                    <span className={getBadgeClass(report.status)}>{report.status}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className={report.status === 'Pending' ? "btn btn-primary btn-sm" : "btn btn-outline btn-sm"}
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye size={16} /> Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '800px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Incident Report <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>#{selectedReport.id}</span>
              </h3>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }} onClick={() => setSelectedReport(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="grid-2" style={{ gap: '2rem' }}>
                {/* Left Column: Details */}
                <div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <span className={getPriorityBadgeClass(selectedReport.priority)}>Priority: {selectedReport.priority}</span>
                    <span className={getBadgeClass(selectedReport.status)}>{selectedReport.status}</span>
                  </div>

                  <h2 style={{ margin: '0 0 0.5rem' }}>{selectedReport.title}</h2>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Category: {selectedReport.category} | Reported: {new Date(selectedReport.dateTime).toLocaleString()}
                  </p>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ margin: '0 0 0.25rem', fontWeight: '600' }}>Reporter Information</p>
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}>
                      {selectedReport.isAnonymous ? (
                        <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--color-amber-warning)' }}>Submitted Anonymously - Privacy protected.</p>
                      ) : (
                        <div className="grid-2">
                          <div><strong>Name:</strong> {selectedReport.reporterName}</div>
                          <div><strong>Phone:</strong> {selectedReport.reporterPhone}</div>
                          <div style={{ gridColumn: 'span 2' }}><strong>Email:</strong> {selectedReport.reporterEmail}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Location</p>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>{selectedReport.location}</p>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Description</p>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedReport.description}</p>
                  </div>

                  {selectedReport.evidenceType !== 'none' && (
                    <div>
                      <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Evidence</p>
                      {selectedReport.evidenceUrl ? (
                        <img src={selectedReport.evidenceUrl} alt="Evidence" style={{ width: '100%', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }} />
                      ) : (
                        <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: 'var(--radius-sm)', display: 'inline-block' }}>
                          <span style={{ fontSize: '0.9rem' }}>📄 {selectedReport.evidenceFileName}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column: Actions & Notes */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                    <h4 style={{ margin: '0 0 1rem' }}>Update Status</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <button 
                        className="btn btn-primary" 
                        disabled={selectedReport.status === 'Under Review'}
                        onClick={() => handleUpdateStatus('Under Review')}
                      >
                        Mark as Under Review
                      </button>
                      <button 
                        className="btn btn-outline" 
                        style={{ color: 'var(--color-emerald-success)', borderColor: 'var(--color-emerald-success)' }}
                        disabled={selectedReport.status === 'Resolved'}
                        onClick={() => handleUpdateStatus('Resolved')}
                      >
                        <CheckCircle size={16} /> Mark as Resolved
                      </button>
                    </div>
                  </div>

                  <div style={{ flex: 1, border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1rem', overflowY: 'auto' }}>
                    <h4 style={{ margin: '0 0 1rem' }}>Timeline Log</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedReport.notes.map((note, idx) => (
                        <div key={idx} style={{ fontSize: '0.9rem' }}>
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginBottom: '0.1rem' }}>{note.timestamp}</div>
                          <div style={{ background: '#f1f5f9', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                            {note.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedReport(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AuthorityDashboard;
