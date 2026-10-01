import React, { createContext, useContext, useState } from 'react';
import { INITIAL_REPORTS } from '../data/mockData';

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  // User mode can be 'citizen', 'authority', or null (guest)
  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    role: 'citizen' // 'citizen' | 'authority'
  });

  const [sosAlerts, setSosAlerts] = useState([
    {
      id: 'SOS-9912',
      location: 'Sector 14 Metro Station (Lat: 28.6145, Long: 77.2098)',
      timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
      status: 'Active Dispatch',
      batteryLevel: '84%'
    }
  ]);

  // Add new crime report
  const addReport = (reportData) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `CR-2026-${randomNum}`;
    const newReport = {
      id: newId,
      title: reportData.title || `${reportData.category || 'Incident'} Report`,
      category: reportData.category || 'Other Offense',
      description: reportData.description,
      location: reportData.location || 'Location Not Specified',
      dateTime: reportData.dateTime || new Date().toISOString().slice(0, 16),
      status: 'Pending',
      priority: reportData.priority || 'Medium',
      isAnonymous: reportData.isAnonymous,
      reporterName: reportData.isAnonymous ? 'Anonymous Citizen' : (user?.name || reportData.reporterName || 'Citizen Reporter'),
      reporterEmail: reportData.isAnonymous ? '' : (user?.email || reportData.reporterEmail || ''),
      reporterPhone: reportData.isAnonymous ? '' : (reportData.reporterPhone || '+91 98765 00000'),
      evidenceFileName: reportData.evidenceFileName || '',
      evidenceType: reportData.evidenceType || 'none',
      evidenceUrl: reportData.evidenceUrl || '',
      assignedOfficer: 'Awaiting Precinct Allocation',
      notes: [
        {
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          text: 'Report submitted via web portal.'
        }
      ]
    };

    setReports((prev) => [newReport, ...prev]);
    return newReport;
  };

  // Update existing report status (for Authority)
  const updateReportStatus = (id, newStatus, noteText = '') => {
    setReports((prev) =>
      prev.map((rep) => {
        if (rep.id === id) {
          const updatedNotes = [
            ...rep.notes,
            {
              timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
              text: noteText || `Status updated to ${newStatus} by Authority Officer.`
            }
          ];
          return {
            ...rep,
            status: newStatus,
            notes: updatedNotes
          };
        }
        return rep;
      })
    );
  };

  // Trigger SOS alert
  const triggerSOS = (customLocation) => {
    const sosId = `SOS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newSos = {
      id: sosId,
      location: customLocation || 'Current Device Geolocation (Lat: 28.6139, Long: 77.2090)',
      timestamp: new Date().toISOString(),
      status: 'Emergency Unit Dispatched',
      batteryLevel: '92%'
    };
    setSosAlerts((prev) => [newSos, ...prev]);
    return newSos;
  };

  // Toggle demo role between Citizen and Authority
  const switchRole = (role) => {
    if (role === 'authority') {
      setUser({
        name: 'Officer Rajesh Deshmukh',
        email: 'r.deshmukh@police.gov.in',
        role: 'authority',
        badgeNumber: 'POL-IND-4092'
      });
    } else if (role === 'citizen') {
      setUser({
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        role: 'citizen'
      });
    } else {
      setUser(null);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        user,
        setUser,
        sosAlerts,
        addReport,
        updateReportStatus,
        triggerSOS,
        switchRole
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportProvider');
  }
  return context;
};
