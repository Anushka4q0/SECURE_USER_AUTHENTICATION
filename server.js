const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

const usersFile = path.join(__dirname, 'users.json');

// Middlewares
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Read users from users.json
function readUsers() {
  if (!fs.existsSync(usersFile)) {
    fs.writeFileSync(usersFile, '[]');
  }
  return JSON.parse(fs.readFileSync(usersFile));
}

// Write users to users.json
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Register endpoint
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  users.push({ username, password });
  writeUsers(users);
  res.status(200).send('Registered successfully');
});

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});