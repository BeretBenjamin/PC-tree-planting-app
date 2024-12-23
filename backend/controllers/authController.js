const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = {
  signup: async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
      const existingUser = await User.findByUsername(username);
      if (existingUser) return res.status(409).json({ error: 'Username already exists' });

      const newUser = { username, email, password, role };
      const result = await User.create(newUser);
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      res.status(400).json({ error: error.toString() });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

      const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  },

  logout: (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'Logged out successfully' });
  },
};

module.exports = authController;
