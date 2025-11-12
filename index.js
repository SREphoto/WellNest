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

// --- Auth API Endpoints ---

// POST /auth/register - Create a new user
app.post('/auth/register', (req, res) => {
    const { email, fullName, password } = req.body;

    if (!email || !fullName || !password) {
        return res.status(400).send('Email, full name, and password are required.');
    }

    // Check if user already exists
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
        null, // profilePictureUrl
        new Date(),
        new Date(),
        null, // lastLoginAt
        'pending_verification',
        null, // devicePushTokens
        null, // emergencyContactDetails
        null  // userAiProfileId
    );

    users.push(newUser);

    // For demonstration, we're returning a simplified user object.
    // In a real app, you might just send a success message.
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

    // User is authenticated, create a JWT
    const accessToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '15m' } // Short-lived access token
    );

    res.json({ accessToken });
});


app.get('/', (req, res) => {
  res.send('WellNest Web App is running!');
});

app.listen(port, () => {
  console.log(`WellNest server listening at http://localhost:${port}`);
});
