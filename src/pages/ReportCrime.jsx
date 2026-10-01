import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useReports } from '../context/ReportContext';
import { CRIME_CATEGORIES } from '../data/mockData';

const ReportCrime = () => {
  const navigate = useNavigate();
  const { addReport, user } = useReports();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    dateTime: '',
    isAnonymous: false,
    priority: 'Medium'
  });
  
  const [evidenceName, setEvidenceName] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [reportId, setReportId] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEvidenceName(e.target.files[0].name);
    }
  };

  const detectLocation = () => {
    setIsLocating(true);
    // Mock location detection
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        location: 'Current Geolocation (Lat: 28.6139, Long: 77.2090)'
      }));
      setIsLocating(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add to context
    const newReport = addReport({
      ...formData,
      evidenceFileName: evidenceName,
      evidenceType: evidenceName ? (evidenceName.endsWith('.mp4') ? 'video' : 'image') : 'none'
    });
    
    setReportId(newReport.id);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '3rem 2rem', textAlign: 'center' }}>
          <CheckCircle size={64} color="var(--color-emerald-success)" style={{ margin: '0 auto 1.5rem' }} />
          <h2 style={{ marginBottom: '1rem' }}>Report Submitted Successfully</h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.05rem' }}>
            Your report has been securely logged and assigned a tracking ID. Authorities have been notified.
          </p>
          <div style={{ background: '#f1f5f9', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginBottom: '2.5rem' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Tracking Reference ID</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--color-primary-navy)', letterSpacing: '1px' }}>{reportId}</strong>
          </div>
          <div className="grid-2">
            <button onClick={() => navigate('/user-dashboard')} className="btn btn-primary">
              View Dashboard
            </button>
            <button onClick={() => navigate('/')} className="btn btn-outline">
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>File a New Report</h2>
        <p>Please provide as much detail as possible. If this is an active emergency, use the SOS button instead.</p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Section 1: Basic Info */}
          <h4 style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>1. Incident Details</h4>
          
          <div className="form-group">
            <label className="form-label">Incident Title</label>
            <input 
              type="text" 
              name="title"
              className="form-input" 
              placeholder="e.g. Vandalism at City Park"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select 
                name="category" 
                className="form-select" 
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category...</option>
                {CRIME_CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Date & Time of Incident</label>
              <input 
                type="datetime-local" 
                name="dateTime"
                className="form-input" 
                value={formData.dateTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Description</label>
            <textarea 
              name="description"
              className="form-textarea" 
              rows="5"
              placeholder="Describe what happened, suspect appearance, vehicle details, etc."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Section 2: Location */}
          <h4 style={{ margin: '2rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>2. Location</h4>
          
          <div className="form-group">
            <label className="form-label">Where did this happen?</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                name="location"
                className="form-input" 
                placeholder="Enter address or landmark"
                value={formData.location}
                onChange={handleChange}
                style={{ flex: 1 }}
                required
              />
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={detectLocation}
                disabled={isLocating}
                style={{ whiteSpace: 'nowrap' }}
              >
                <MapPin size={18} /> {isLocating ? 'Locating...' : 'Detect My Location'}
              </button>
            </div>
          </div>

          {/* Section 3: Evidence */}
          <h4 style={{ margin: '2rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>3. Evidence (Optional)</h4>
          
          <div className="form-group">
            <div style={{ 
              border: '2px dashed var(--color-border-dark)', 
              borderRadius: 'var(--radius-md)', 
              padding: '2.5rem 1.5rem', 
              textAlign: 'center',
              backgroundColor: '#f8fafc'
            }}>
              <Upload size={32} color="var(--color-accent-blue)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Drag & drop files or click to browse</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Supports JPG, PNG, MP4 (Max 50MB)</p>
              
              <input 
                type="file" 
                id="evidence-upload" 
                className="form-input" 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
                accept="image/*,video/*"
              />
              <label htmlFor="evidence-upload" className="btn btn-outline btn-sm">
                Choose File
              </label>
              
              {evidenceName && (
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-emerald-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} /> Attached: {evidenceName}
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Privacy & Submit */}
          <h4 style={{ margin: '2rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>4. Privacy & Submission</h4>
          
          <div style={{ background: 'var(--color-amber-light)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <AlertCircle size={24} color="var(--color-amber-warning)" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
            <div>
              <label className="form-checkbox-label" style={{ fontWeight: '600', color: 'var(--color-primary-navy)', marginBottom: '0.25rem' }}>
                <input 
                  type="checkbox" 
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                />
                Submit this report anonymously
              </label>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-amber-warning)', margin: 0 }}>
                If checked, your personal details will not be shared with the investigating officers. However, this may limit their ability to contact you for follow-up questions.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem' }}>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-lg">Submit Report</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ReportCrime;
