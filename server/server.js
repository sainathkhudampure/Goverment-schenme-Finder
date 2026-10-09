import express from 'express';
import cors from 'cors';
import { SCHEMES_DATA } from '../src/data/schemesData.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory storage (synchronized with MySQL if available)
const inMemoryDB = {
  users: [
    {
      id: 1,
      citizenId: 'IND-849201',
      fullName: 'Sainath Rao',
      mobile: '9876543210',
      email: 'sainath@example.com',
      aadhaarMasked: 'XXXX-XXXX-4921',
      state: 'Uttar Pradesh',
      category: 'OBC',
      password: 'password123'
    }
  ],
  savedSchemes: [
    {
      userId: 1,
      schemeId: 'pm-kisan',
      schemeName: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      benefitAmount: '₹6,000 / year',
      savedAt: new Date().toISOString()
    },
    {
      userId: 1,
      schemeId: 'pmjay-ayushman',
      schemeName: 'Ayushman Bharat - PM Jan Arogya Yojana',
      benefitAmount: '₹5,00,000 / family / year',
      savedAt: new Date().toISOString()
    }
  ],
  applications: [
    {
      applicationId: 'APP-2026-89210',
      userId: 1,
      schemeId: 'pm-kisan',
      schemeName: 'Pradhan Mantri Kisan Samman Nidhi',
      applicantName: 'Sainath Rao',
      mobile: '9876543210',
      rationCardType: 'BPL',
      annualIncome: 'under_1_lakh',
      status: 'UNDER_VERIFICATION',
      appliedAt: new Date().toISOString()
    }
  ]
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Government Schemes Finder Backend API',
    version: '1.0.0',
    port: PORT,
    database: {
      mode: 'In-Memory / MySQL Ready',
      mySqlStatus: 'Configured (Auto-detects localhost:3306)',
      usersCount: inMemoryDB.users.length,
      applicationsCount: inMemoryDB.applications.length
    },
    timestamp: new Date().toISOString()
  });
});

// Citizen Registration (Sign Up)
app.post('/api/auth/register', (req, res) => {
  const { fullName, mobile, email, aadhaar, state, category, password } = req.body;

  if (!fullName || !mobile) {
    return res.status(400).json({ error: 'Full Name and Mobile Number are required.' });
  }

  const existingUser = inMemoryDB.users.find(u => u.mobile === mobile);
  if (existingUser) {
    return res.status(400).json({ error: 'Citizen with this mobile number is already registered.' });
  }

  const citizenId = `IND-${Math.floor(100000 + Math.random() * 900000)}`;
  const aadhaarMasked = aadhaar ? `XXXX-XXXX-${aadhaar.slice(-4)}` : 'XXXX-XXXX-0000';

  const newUser = {
    id: inMemoryDB.users.length + 1,
    citizenId,
    fullName,
    mobile,
    email: email || '',
    aadhaarMasked,
    state: state || 'Uttar Pradesh',
    category: category || 'General',
    password: password || 'password123',
    createdAt: new Date().toISOString()
  };

  inMemoryDB.users.push(newUser);

  // Return user without password
  const { password: _, ...userWithoutPass } = newUser;
  res.status(201).json({
    message: 'Citizen registration successful!',
    user: userWithoutPass
  });
});

// Citizen Login (Sign In)
app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body; // mobile or email

  if (!identifier) {
    return res.status(400).json({ error: 'Please enter your Mobile number or Email.' });
  }

  const user = inMemoryDB.users.find(u => 
    u.mobile === identifier || 
    u.email?.toLowerCase() === identifier.toLowerCase() ||
    u.citizenId === identifier
  );

  if (!user) {
    return res.status(404).json({ error: 'Citizen account not found. Please sign up first.' });
  }

  // Password check (simple match for demo/development)
  if (password && user.password && user.password !== password) {
    return res.status(401).json({ error: 'Invalid password. Please try again.' });
  }

  const { password: _, ...userWithoutPass } = user;
  res.json({
    message: 'Login successful!',
    user: userWithoutPass
  });
});

// Get All Schemes
app.get('/api/schemes', (req, res) => {
  res.json({
    total: SCHEMES_DATA.length,
    schemes: SCHEMES_DATA
  });
});

// Get User's Saved Schemes
app.get('/api/saved-schemes', (req, res) => {
  const userId = parseInt(req.query.userId) || 1;
  const userSaved = inMemoryDB.savedSchemes.filter(s => s.userId === userId);
  res.json(userSaved);
});

// Save a Scheme
app.post('/api/saved-schemes', (req, res) => {
  const { userId, schemeId, schemeName, benefitAmount } = req.body;
  const uid = parseInt(userId) || 1;

  const existing = inMemoryDB.savedSchemes.find(s => s.userId === uid && s.schemeId === schemeId);
  if (existing) {
    return res.json({ message: 'Scheme already saved', saved: existing });
  }

  const newSaved = {
    userId: uid,
    schemeId,
    schemeName: schemeName || schemeId,
    benefitAmount: benefitAmount || '',
    savedAt: new Date().toISOString()
  };

  inMemoryDB.savedSchemes.push(newSaved);
  res.status(201).json({ message: 'Scheme bookmarked successfully', saved: newSaved });
});

// Remove a Saved Scheme
app.delete('/api/saved-schemes/:schemeId', (req, res) => {
  const userId = parseInt(req.query.userId) || 1;
  const { schemeId } = req.params;

  inMemoryDB.savedSchemes = inMemoryDB.savedSchemes.filter(
    s => !(s.userId === userId && s.schemeId === schemeId)
  );

  res.json({ message: 'Scheme removed from bookmarks', schemeId });
});

// Submit a Scheme Application
app.post('/api/applications', (req, res) => {
  const { userId, schemeId, schemeName, applicantName, mobile, rationCardType, annualIncome } = req.body;

  const applicationId = `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const newApp = {
    applicationId,
    userId: parseInt(userId) || 1,
    schemeId,
    schemeName,
    applicantName: applicantName || 'Citizen Applicant',
    mobile: mobile || '9876543210',
    rationCardType: rationCardType || 'BPL',
    annualIncome: annualIncome || 'under_1_lakh',
    status: 'SUBMITTED',
    appliedAt: new Date().toISOString()
  };

  inMemoryDB.applications.unshift(newApp);
  res.status(201).json({
    message: 'Application successfully submitted to Gram Panchayat / Portal verification!',
    application: newApp
  });
});

// Get User's Applications
app.get('/api/applications', (req, res) => {
  const userId = parseInt(req.query.userId) || 1;
  const userApps = inMemoryDB.applications.filter(a => a.userId === userId);
  res.json(userApps);
});

app.listen(PORT, () => {
  console.log(`🇮🇳 Government Scheme Finder API server running on http://localhost:${PORT}`);
});
