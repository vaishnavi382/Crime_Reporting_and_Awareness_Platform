// Mock Data for Crime Reporting and Awareness Platform

export const CRIME_CATEGORIES = [
  { id: 'theft', name: 'Theft & Robbery', icon: 'ShoppingBag', description: 'Stolen property, burglary, mugging, or pickpocketing.' },
  { id: 'vandalism', name: 'Vandalism & Damage', icon: 'AlertTriangle', description: 'Property destruction, graffiti, or vehicle damage.' },
  { id: 'cybercrime', name: 'Cybercrime & Fraud', icon: 'ShieldAlert', description: 'Online scams, phishing, identity theft, or financial fraud.' },
  { id: 'harassment', name: 'Assault & Harassment', icon: 'UserX', description: 'Physical violence, verbal abuse, stalking, or harassment.' },
  { id: 'traffic', name: 'Traffic & Hit-and-Run', icon: 'Car', description: 'Reckless driving, hit-and-run accidents, or road rage.' },
  { id: 'suspicious', name: 'Suspicious Activity', icon: 'Eye', description: 'Unusual behavior, loitering around property, or suspicious packages.' },
  { id: 'substance', name: 'Narcotics & Substance', icon: 'Activity', description: 'Illegal drug sales, public intoxication, or substance abuse.' },
  { id: 'other', name: 'Other Offense', icon: 'HelpCircle', description: 'Any public safety concern not covered in the above categories.' }
];

export const INITIAL_REPORTS = [
  {
    id: 'CR-2026-8941',
    title: 'Vehicle Break-in at North Campus Parking',
    category: 'Theft & Robbery',
    description: 'Passenger side window smashed and laptop bag stolen from blue sedan parked near Gate 3. Security cameras may have captured a person wearing a dark hoodie leaving toward 4th Avenue.',
    location: 'North Campus Parking Lot, Block B (Lat: 28.6139, Long: 77.2090)',
    dateTime: '2026-09-29T18:45',
    status: 'Under Review',
    priority: 'High',
    isAnonymous: false,
    reporterName: 'Aarav Sharma',
    reporterEmail: 'aarav.sharma@example.com',
    reporterPhone: '+91 98765 43210',
    evidenceFileName: 'damaged_window_photo.jpg',
    evidenceType: 'image',
    evidenceUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80',
    assignedOfficer: 'Officer R. Deshmukh (Zone 4 Station)',
    notes: [
      { timestamp: '2026-09-29T18:50', text: 'Report submitted by citizen.' },
      { timestamp: '2026-09-29T19:30', text: 'Report assigned to Precinct 4 Patrol team for review.' }
    ]
  },
  {
    id: 'CR-2026-8942',
    title: 'Phishing SMS & Unlawful Bank Transfer',
    category: 'Cybercrime & Fraud',
    description: 'Received a fraudulent SMS posing as bank customer care requesting KYC update. Upon clicking link, ₹18,500 was illegally transferred to an unknown account.',
    location: 'Online / Electronic Transfer (Cyber Cell Region 2)',
    dateTime: '2026-09-28T14:15',
    status: 'Pending',
    priority: 'Medium',
    isAnonymous: true,
    reporterName: 'Anonymous Citizen',
    evidenceFileName: 'sms_screenshot.png',
    evidenceType: 'image',
    evidenceUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
    assignedOfficer: 'Unassigned (Awaiting triage)',
    notes: [
      { timestamp: '2026-09-28T14:15', text: 'Anonymous report logged into central database.' }
    ]
  },
  {
    id: 'CR-2026-8943',
    title: 'Street Lamp Vandalism near Public Park',
    category: 'Vandalism & Damage',
    description: 'Three municipal solar street lamps were intentionally damaged with rocks near the east pedestrian walkway of Central Municipal Park, creating a safety hazard at night.',
    location: 'East Walkway, Central Park, MG Road',
    dateTime: '2026-09-27T22:10',
    status: 'Resolved',
    priority: 'Low',
    isAnonymous: false,
    reporterName: 'Priya Verma',
    reporterEmail: 'priya.v@example.com',
    reporterPhone: '+91 91234 56789',
    evidenceFileName: 'broken_lamp.jpg',
    evidenceType: 'image',
    evidenceUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    assignedOfficer: 'Inspector K. Patel (Civic Maintenance & Safety)',
    notes: [
      { timestamp: '2026-09-27T22:10', text: 'Report logged by Priya Verma.' },
      { timestamp: '2026-09-28T09:00', text: 'Inspected by City Works Department team.' },
      { timestamp: '2026-09-29T11:00', text: 'Lamps replaced and area restored. Report marked Resolved.' }
    ]
  },
  {
    id: 'CR-2026-8944',
    title: 'Hit and Run Involving Black SUV',
    category: 'Traffic & Hit-and-Run',
    description: 'Black SUV overspeeding past red light struck a stationary two-wheeler and sped off without stopping. Two-wheeler rider sustained minor injuries.',
    location: 'Junction 14, Ring Road Bypass',
    dateTime: '2026-09-30T08:30',
    status: 'Under Review',
    priority: 'High',
    isAnonymous: false,
    reporterName: 'Vikram Singh',
    reporterEmail: 'vikram.s@example.com',
    reporterPhone: '+91 99887 76655',
    evidenceFileName: 'dashcam_clip_fragment.mp4',
    evidenceType: 'video',
    evidenceUrl: '',
    assignedOfficer: 'Traffic Control Room - Officer S. Rao',
    notes: [
      { timestamp: '2026-09-30T08:35', text: 'Emergency ticket dispatched to traffic CCTV monitoring room.' }
    ]
  },
  {
    id: 'CR-2026-8945',
    title: 'Suspicious Activity near Commercial Warehouse',
    category: 'Suspicious Activity',
    description: 'Group of three individuals observed attempting door handles of closed commercial units around 2 AM carrying heavy backpacks.',
    location: 'Sector 5 Industrial Estate, Lane 3',
    dateTime: '2026-09-30T02:15',
    status: 'Pending',
    priority: 'Medium',
    isAnonymous: true,
    reporterName: 'Anonymous Citizen',
    evidenceFileName: 'warehouse_cctv_frame.png',
    evidenceType: 'image',
    evidenceUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=600&q=80',
    assignedOfficer: 'Unassigned',
    notes: [
      { timestamp: '2026-09-30T02:15', text: 'Report logged via web portal.' }
    ]
  }
];

export const MOCK_AWARENESS_STATS = {
  totalIncidentsTracked: 1420,
  resolutionRatePercent: 88.4,
  avgResponseTimeMin: 14.2,
  activePatrolsCount: 38,
  
  categoryDistribution: [
    { category: 'Theft & Robbery', count: 480, percent: 33.8, color: '#2563eb' },
    { category: 'Cybercrime & Fraud', count: 340, percent: 23.9, color: '#7c3aed' },
    { category: 'Traffic & Accidents', count: 220, percent: 15.5, color: '#0284c7' },
    { category: 'Vandalism & Property', count: 180, percent: 12.7, color: '#d97706' },
    { category: 'Assault & Harassment', count: 120, percent: 8.5, color: '#dc2626' },
    { category: 'Other Offenses', count: 80, percent: 5.6, color: '#64748b' }
  ],

  monthlyTrend: [
    { month: 'Apr', count: 110 },
    { month: 'May', count: 125 },
    { month: 'Jun', count: 140 },
    { month: 'Jul', count: 132 },
    { month: 'Aug', count: 118 },
    { month: 'Sep', count: 105 }
  ],

  highAwarenessZones: [
    { zone: 'Central Metro Hub', riskLevel: 'Moderate', mainIssue: 'Pickpocketing & Cyber Kiosk Fraud', resolution: 'Enhanced CCTV & undercover foot patrols' },
    { zone: 'Industrial Belt Sector 4', riskLevel: 'High', mainIssue: 'Night Vandalism & Cargo Theft', resolution: 'Night patrol checkpoints established' },
    { zone: 'University Campus Zone', riskLevel: 'Low', mainIssue: 'Bicycle Theft & Unattended Items', resolution: 'Student awareness drives & smart locker installations' },
    { zone: 'Suburban Highway 8', riskLevel: 'Moderate', mainIssue: 'Speeding & Reckless Driving', resolution: 'Speed radar enforcement' }
  ]
};

export const SAFETY_TIPS = [
  {
    title: 'Cyber Safety & Online Scam Prevention',
    category: 'Cybercrime',
    tips: [
      'Never share OTPs, passwords, or UPI PINs with anyone over call or SMS.',
      'Verify official websites before entering bank details (check for https:// and secure lock icon).',
      'Report financial cyber frauds immediately to national helpline 1930 within the golden hour.'
    ]
  },
  {
    title: 'Personal Safety & Emergency Preparedness',
    category: 'Personal Safety',
    tips: [
      'Keep trusted emergency contacts on speed dial or active on your mobile phone SOS shortcut.',
      'Stay alert in unfamiliar or poorly lit areas at night and avoid distracted smartphone usage.',
      'Share your live location with family members when taking solo late-night transportation.'
    ]
  },
  {
    title: 'Residential & Property Security',
    category: 'Property Protection',
    tips: [
      'Ensure strong physical deadbolts and adequate exterior lighting around entry doors.',
      'Inform trusted neighbors or local police precinct during extended vacation periods.',
      'Install motion-sensor cameras or smart doorbells at key entry points.'
    ]
  }
];

export const EMERGENCY_CONTACTS = [
  { title: 'National Emergency Number', number: '112', description: 'Unified emergency response for Police, Fire, and Ambulance.' },
  { title: 'Police Control Room', number: '100', description: 'Direct police assistance and immediate crime reporting.' },
  { title: 'Women Helpline', number: '1091', description: '24/7 dedicated support and safety assistance for women.' },
  { title: 'National Cyber Crime Portal', number: '1930', description: 'Financial fraud reporting and digital theft containment.' },
  { title: 'Fire & Rescue Services', number: '101', description: 'Fire hazard emergencies and structural rescue operations.' },
  { title: 'Medical Ambulance', number: '108', description: 'Emergency medical services and paramedic dispatch.' }
];
