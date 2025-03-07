require('dotenv').config();
const express = require('express');
const connectToMongo = require('./db/index'); // Ensure this file correctly sets up MongoDB connection
const AuthRouter = require('./routes/auth.route');
const HomeRouter = require('./routes/home.route');
const userRoute = require('./routes/user.route')
const PORT = process.env.PORT || 4000;
const app = express();

// Connect to the database
connectToMongo();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', AuthRouter);
app.use('/home', HomeRouter);
app.use('/users', userRoute)
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
