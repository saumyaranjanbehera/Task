
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const db = require('./models/Personmodel').db;
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const personRouter = require('./Routes/Personroutes');
app.use('/api/entities/person', personRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
