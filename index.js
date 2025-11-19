const express = require('express');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Connection = require('./models/connection');
const UserMoodStatus = require('./models/userMoodStatus');

const app = express();
const port = 3000;

// In a real application, this secret would be stored in a secure location (e.g., AWS Secrets Manager)
const JWT_SECRET = 'your-super-secret-key-that-should-be-long-and-random';

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
const users = [];
const connections = [];
const moodStatuses = [];

// --- JWT Authentication Middleware ---

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <TOKEN>

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};


// --- Auth API Endpoints ---

// POST /auth/register - Create a new user
app.post('/auth/register', (req, res) => {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
        return res.status(400).send('Email, full name, and password are required.');
    }

    if (users.some(user => user.email === email)) {
        return res.status(409).send('A user with this email already exists.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const newUser = new User(
        uuidv4(),
        email,
        passwordHash,
        salt,
        fullName,
        null, null, null, 'pending_verification', null, [], null
    );

    users.push(newUser);

    res.status(201).json({ id: newUser.id, email: newUser.email, fullName: newUser.fullName });
});

// POST /auth/login - Authenticate user and issue a JWT
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('Invalid credentials.');
    }

    const passwordHash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (passwordHash !== user.passwordHash) {
        return res.status(401).send('Invalid credentials.');
    }

    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    res.json({ accessToken });
});


// --- User Profile & Privacy Endpoints ---

// GET /users/me/profile/privacy-settings - Get current privacy settings
app.get('/users/me/profile/privacy-settings', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        res.json(user.privacySettings);
    } else {
        res.status(404).send('User not found');
    }
});

// PUT /users/me/profile/privacy-settings - Update privacy settings
app.put('/users/me/profile/privacy-settings', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        const { profileVisibility, showEmail, showBio } = req.body;

        if (profileVisibility !== undefined) user.privacySettings.profileVisibility = profileVisibility;
        if (showEmail !== undefined) user.privacySettings.showEmail = showEmail;
        if (showBio !== undefined) user.privacySettings.showBio = showBio;

        res.json(user.privacySettings);
    } else {
        res.status(404).send('User not found');
    }
});

// --- Emergency & Alert Contact Management ---

// GET /users/me/emergency-contacts - Get emergency contacts
app.get('/users/me/emergency-contacts', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        res.json(user.emergencyContactDetails);
    } else {
        res.status(404).send('User not found');
    }
});

// PUT /users/me/emergency-contacts - Update emergency contacts
app.put('/users/me/emergency-contacts', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (user) {
        const { emergencyContacts } = req.body;

        if (!Array.isArray(emergencyContacts)) {
            return res.status(400).send('Request body must contain an emergencyContacts array.');
        }

        user.emergencyContactDetails = emergencyContacts;

        res.json(user.emergencyContactDetails);
    } else {
        res.status(404).send('User not found');
    }
});

// --- Connections Endpoints ---

// POST /connections/request/:userId - Send a connection request
app.post('/connections/request/:userId', authenticateToken, (req, res) => {
    const recipientId = req.params.userId;
    const requesterId = req.user.id;

    if (recipientId === requesterId) {
        return res.status(400).send('You cannot connect with yourself.');
    }

    const recipient = users.find(u => u.id === recipientId);
    if (!recipient) {
        return res.status(404).send('Recipient not found.');
    }

    const existingConnection = connections.find(c =>
        (c.requesterUserId === requesterId && c.recipientUserId === recipientId) ||
        (c.requesterUserId === recipientId && c.recipientUserId === requesterId)
    );
    if (existingConnection) {
        return res.status(409).send('Connection already exists or is pending.');
    }

    const newConnection = new Connection(
        uuidv4(),
        requesterId,
        recipientId,
        'pending',
        new Date(),
        new Date()
    );
    connections.push(newConnection);
    res.status(201).json(newConnection);
});

// GET /connections/pending - Get pending connection requests
app.get('/connections/pending', authenticateToken, (req, res) => {
    const pendingRequests = connections.filter(c => c.recipientUserId === req.user.id && c.status === 'pending');
    res.json(pendingRequests);
});

// PUT /connections/accept/:connectionId - Accept a connection request
app.put('/connections/accept/:connectionId', authenticateToken, (req, res) => {
    const connection = connections.find(c => c.id === req.params.connectionId);
    if (!connection || connection.recipientUserId !== req.user.id || connection.status !== 'pending') {
        return res.status(404).send('Pending connection request not found.');
    }
    connection.status = 'accepted';
    connection.updatedAt = new Date();
    res.json(connection);
});

// PUT /connections/reject/:connectionId - Reject a connection request
app.put('/connections/reject/:connectionId', authenticateToken, (req, res) => {
    const connection = connections.find(c => c.id === req.params.connectionId);
    if (!connection || connection.recipientUserId !== req.user.id || connection.status !== 'pending') {
        return res.status(404).send('Pending connection request not found.');
    }
    connection.status = 'rejected';
    connection.updatedAt = new Date();
    res.json(connection);
});

// GET /connections - Get all accepted connections
app.get('/connections', authenticateToken, (req, res) => {
    const myConnections = connections.filter(c =>
        (c.requesterUserId === req.user.id || c.recipientUserId === req.user.id) && c.status === 'accepted'
    );
    res.json(myConnections);
});

// --- Mood Status Endpoints ---

// POST /mood-status - Post a new mood status
app.post('/mood-status', authenticateToken, (req, res) => {
    const { moodieType, actualScore, optionalContextText, privacySetting } = req.body;

    if (!moodieType || actualScore === undefined) {
        return res.status(400).send('moodieType and actualScore are required.');
    }

    const newMoodStatus = new UserMoodStatus(
        uuidv4(),
        req.user.id,
        moodieType,
        actualScore,
        new Date(),
        optionalContextText,
        privacySetting || 'ALL_CONNECTIONS',
        null // inferredSentiment
    );
    moodStatuses.push(newMoodStatus);
    res.status(201).json(newMoodStatus);
});

// GET /mood-status/feed - Get the mood status feed from connections
app.get('/mood-status/feed', authenticateToken, (req, res) => {
    const myConnections = connections.filter(c =>
        (c.requesterUserId === req.user.id || c.recipientUserId === req.user.id) && c.status === 'accepted'
    );

    const connectionUserIds = myConnections.map(c =>
        c.requesterUserId === req.user.id ? c.recipientUserId : c.requesterUserId
    );

    const feed = moodStatuses.filter(ms => connectionUserIds.includes(ms.userId))
        .sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent

    res.json(feed);
});


app.get('/', (req, res) => {
  res.send('WellNest Web App is running!');
});

app.listen(port, () => {
  console.log(`WellNest server listening at http://localhost:${port}`);
});
