const express = require('express');
const os = require('os');

const app = express();

app.get('/', (req, res) => {
  const ipAddress = req.ip;
  const hostname = os.hostname();
  const name = req.hostname;
  const version = process.env.VERSION;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server Information</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>Server Information</h1>
      <p>IP Address: ${ipAddress}</p>
      <p>Hostname: ${hostname}</p>
      <p>Name: ${name}</p>
      <p>Application Version: ${version}</p>
    </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
