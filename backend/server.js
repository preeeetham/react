const express = require('express');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const setupPassport = require('./config/passport');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Connect to MongoDB
connectDB();

// Setup Passport
setupPassport();

// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});