const express = require('express');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const User = require('./models/user');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database"
const users = [];

// --- User API Endpoints ---

// POST /auth/register - Create a new user
app.post('/auth/register', (req, res) => {
    const { email, fullName, password } = req.body;

    // Basic validation
    if (!email || !fullName || !password) {
        return res.status(400).send('Email, full name, and password are required.');
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    const newUser = new User(
        uuidv4(),
        email,
        passwordHash,
        salt,
        fullName,
        null, // profilePictureUrl
        new Date(),
        new Date(),
        null, // lastLoginAt
        'pending_verification', // status
        null, // devicePushTokens
        null, // emergencyContactDetails
        null  // userAiProfileId
    );

    users.push(newUser);
    // In a real application, we would not send the full user object back.
    // This is simplified for demonstration purposes.
    res.status(201).json({ id: newUser.id, email: newUser.email, fullName: newUser.fullName });
});

// POST /auth/login - Authenticate a user
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).send('Invalid email or password.');
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
    if (hash !== user.passwordHash) {
        return res.status(401).send('Invalid email or password.');
    }

    // Update last login
    user.lastLoginAt = new Date();

    // Return user info (excluding sensitive data)
    res.json({
        message: 'Login successful',
        user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            status: user.status
        }
    });
});


app.get('/', (req, res) => {
  res.send('WellNest Web App is running!');
});

app.listen(port, () => {
  console.log(`WellNest server listening at http://localhost:${port}`);
});
