const express = require('express');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const app = express();
const port = 3000;

// In a real application, this secret would be stored in a secure location (e.g., AWS Secrets Manager)
const JWT_SECRET = 'your-super-secret-key-that-should-be-long-and-random';

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
const users = [];

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

        // Basic validation
        if (!Array.isArray(emergencyContacts)) {
            return res.status(400).send('Request body must contain an emergencyContacts array.');
        }

        user.emergencyContactDetails = emergencyContacts;

        res.json(user.emergencyContactDetails);
    } else {
        res.status(404).send('User not found');
    }
});


app.get('/', (req, res) => {
  res.send('WellNest Web App is running!');
});

app.listen(port, () => {
  console.log(`WellNest server listening at http://localhost:${port}`);
});
