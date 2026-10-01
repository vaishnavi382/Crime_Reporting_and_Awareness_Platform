import React, { useState, useMemo } from 'react';
import { FileText, Clock, CheckCircle, Search, Filter, Eye, X } from 'lucide-react';
import { useReports } from '../context/ReportContext';

const UserDashboard = () => {
  const { reports, user } = useReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedReport, setSelectedReport] = useState(null);

  // Filter reports specifically for this user's email or where they are the reporter
  // (In a real app, this would be handled securely via backend UUID matching)
  const userReports = useMemo(() => {
    if (!user) return [];
    return reports.filter(r => r.reporterEmail === user.email || r.reporterName === user.name);
  }, [reports, user]);

  const filteredReports = useMemo(() => {
    return userReports.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [userReports, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: userReports.length,
      pending: userReports.filter(r => r.status === 'Pending').length,
      underReview: userReports.filter(r => r.status === 'Under Review').length,
      resolved: userReports.filter(r => r.status === 'Resolved').length
    };
  }, [userReports]);

  const getBadgeClass = (status) => {
    switch(status) {
      case 'Pending': return 'badge badge-pending';
      case 'Under Review': return 'badge badge-under-review';
      case 'Resolved': return 'badge badge-resolved';
      default: return 'badge';
    }
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2>Welcome back, {user?.name.split(' ')[0]}</h2>
          <p>Track your submitted reports and their current status.</p>
        </div>
        <button className="btn btn-primary" onClick={() => window.location.href = '/report'}>
          + New Report
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <FileText size={24} color="var(--color-primary-navy)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Total Reports</p>
            <h2 style={{ margin: 0 }}>{stats.total}</h2>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-amber-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <Clock size={24} color="var(--color-amber-warning)" />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Pending</p>
            <h2 style={{ margin: 0 }}>{stats.pending}</h2>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'var(--color-accent-blue-light)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <Search size={24} color="var(--color-accent-blue)" />
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
            <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Resolved</p>
            <h2 style={{ margin: 0 }}>{stats.resolved}</h2>
          </div>
        </div>
      </div>

      {/* Reports List Area */}
      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ margin: 0 }}>Your Reports</h3>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search ID or title..." 
                style={{ paddingLeft: '2.2rem', width: '250px' }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={{ position: 'relative' }}>
              <Filter size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <select 
                className="form-select" 
                style={{ paddingLeft: '2.2rem', width: '150px' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Review">Under Review</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', borderRadius: '0' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Incident Details</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length > 0 ? (
                filteredReports.map(report => (
                  <tr key={report.id}>
                    <td style={{ fontWeight: '600', color: 'var(--color-primary-navy)' }}>{report.id}</td>
                    <td>
                      <div style={{ fontWeight: '500' }}>{report.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{report.category}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.9rem' }}>{new Date(report.dateTime).toLocaleDateString()}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(report.dateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                    </td>
                    <td>
                      <span className={getBadgeClass(report.status)}>{report.status}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                      <FileText size={48} style={{ opacity: 0.3, margin: '0 auto' }} />
                    </div>
                    <h4>No reports found</h4>
                    <p>You haven't submitted any reports matching the current filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Report Details <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>#{selectedReport.id}</span>
              </h3>
              <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }} onClick={() => setSelectedReport(null)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="modal-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ margin: '0 0 0.25rem' }}>{selectedReport.title}</h2>
                  <div style={{ display: 'flex', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                    <span>Category: <strong>{selectedReport.category}</strong></span>
                    <span>•</span>
                    <span>{new Date(selectedReport.dateTime).toLocaleString()}</span>
                  </div>
                </div>
                <div>
                  <span className={getBadgeClass(selectedReport.status)}>{selectedReport.status}</span>
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Location</p>
                <p style={{ margin: 0, fontSize: '0.95rem' }}>{selectedReport.location}</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Description</p>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>{selectedReport.description}</p>
              </div>

              {selectedReport.evidenceType !== 'none' && (
                <div style={{ marginBottom: '2rem' }}>
                  <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>Attached Evidence</p>
                  {selectedReport.evidenceUrl ? (
                    <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--color-border)', width: '100%', maxWidth: '300px' }}>
                      <img src={selectedReport.evidenceUrl} alt="Evidence" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                  ) : (
                    <div style={{ padding: '1rem', background: '#f1f5f9', borderRadius: 'var(--radius-sm)', display: 'inline-block' }}>
                      <span style={{ fontSize: '0.9rem' }}>📄 {selectedReport.evidenceFileName}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <p style={{ margin: '0 0 1rem', fontWeight: '600' }}>Timeline / Notes</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {selectedReport.notes.map((note, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-accent-blue)', flexShrink: 0, marginTop: '0.2rem' }}></div>
                        {idx !== selectedReport.notes.length - 1 && (
                          <div style={{ width: '2px', height: '100%', background: 'var(--color-border)', marginTop: '0.2rem' }}></div>
                        )}
                      </div>
                      <div style={{ paddingBottom: '0.5rem' }}>
                        <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>{note.timestamp}</span>
                        <p style={{ margin: 0, fontSize: '0.95rem' }}>{note.text}</p>
                      </div>
                    </div>
                  ))}
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

export default UserDashboard;
