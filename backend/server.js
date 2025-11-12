const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// ✅ Connect to MongoDB (no deprecated options needed)
mongoose.connect('mongodb://localhost:27017/mydb')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// ✅ Define schema and model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));

// ✅ Test route to return all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
