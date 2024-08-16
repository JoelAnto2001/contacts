const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
