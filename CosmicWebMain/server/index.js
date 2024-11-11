// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://linhcka1908g01:Cecilia3108@cluster0.bnetuei.mongodb.net/cosmic?retryWrites=true&w=majority';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Define Mongoose Schemas
const planetSchema = new mongoose.Schema({
    planet_id: Number,
    planet_name: String,
    discovery_date: Date,
    type_planet: String,
    size: Number,
    mass: Number
});

const userSchema = new mongoose.Schema({
    user_id: Number,
    username: String,
    email: String,
    password: String,
    role: String,
    created_at: Date
});

const explorationSchema = new mongoose.Schema({
    exploration_id: Number,
    exploration_title: String,
    exploration_date: Date,
    exploration_description: String,
    body: String,
    user_id: Number,
    status: String,
    created_at: Date,
    planet_id: Number,
    celestial_objects_id: Number
});

// Create Mongoose Models
const Planet = mongoose.model('Planet', planetSchema);
const User = mongoose.model('User', userSchema);
const Exploration = mongoose.model('Exploration', explorationSchema);

// Basic Routing
app.get('/', (req, res) => {
    res.send('Welcome to the Admin Dashboard API');
});

// API Endpoints
app.get('/api/planets', async (req, res) => {
    try {
        const planets = await Planet.find();
        res.json(planets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch planets' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.get('/api/explorations', async (req, res) => {
    try {
        const explorations = await Exploration.find();
        res.json(explorations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch explorations' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});