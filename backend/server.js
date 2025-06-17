const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); 

// 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/loginapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 2. Create Schema
const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  phone: String,
  password: String,
});

// 3. Create Model
const User = mongoose.model('User', userSchema);

// 4. Route to handle POST
 app.post('/register', async (req, res) => {
  console.log(req.body); // see data in terminal

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: 'User data saved!' });
  } catch (error) {
    console.error('❌ Save error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// 5. Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
