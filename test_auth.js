const http = require('http');

function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, body: JSON.parse(body || '{}') }));
        });
        req.on('error', reject);
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function test() {
    console.log('Testing Registration...');
    const registerRes = await request({
        hostname: 'localhost',
        port: 3000,
        path: '/auth/register',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, {
        email: 'test@example.com',
        fullName: 'Test User',
        password: 'password123'
    });
    console.log('Register Status:', registerRes.statusCode);
    console.log('Register Body:', registerRes.body);

    if (registerRes.statusCode === 201) {
        console.log('\nTesting Login...');
        const loginRes = await request({
            hostname: 'localhost',
            port: 3000,
            path: '/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }, {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login Status:', loginRes.statusCode);
        console.log('Login Body:', loginRes.body);
    }
}

test().catch(console.error);
