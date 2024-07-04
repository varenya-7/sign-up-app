const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/signupApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  try {
    await newUser.save();
    res.status(201).send('User created');
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
``