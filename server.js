// server.js
// A tiny web app. It just says "hello" and tells you which server answered.
// This is the app we'll run on TWO different cloud computers (servers),
// so we can see a load balancer split traffic between them.

const express = require('express');
const app = express();

// The name of THIS server (Server 1 / Server 2).
// We set this using an environment variable so the same code
// can run on both machines, just with a different name each time.
const SERVER_NAME = process.env.SERVER_NAME || 'Server 1';
const PORT = process.env.PORT || 3000;

// Main page — shows who answered the request
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; margin-top: 100px;">
        <h1>Hello from ${SERVER_NAME}</h1>
        <p>This page was served at: ${new Date().toLocaleTimeString()}</p>
      </body>
    </html>
  `);
});

// A "health check" page — cloud tools use this to check
// if the server is alive and working properly.
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', server: SERVER_NAME });
});

// This line only starts the actual web server when we run the file directly
// (not when a test file imports it) — this is what makes testing possible.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`${SERVER_NAME} is running on port ${PORT}`);
  });
}

module.exports = app;
