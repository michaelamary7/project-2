// eventListPage.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5173;

// Middleware
app.use(cors());
app.use(express.json());

// Store events in memory (replace with database in production)
let events = [
    {
        id: 1,
        name: "New Year's Day",
        date: "2024-01-01",
        description: "First day of the year",
        category: "holiday"
    },
    {
        id: 2,
        name: "Valentine's Day",
        date: "2024-02-14",
        description: "Day of love and friendship",
        category: "holiday"
    }
];

// GET all events
app.get('/api/events', (req, res) => {
    try {
        res.json({ success: true, events });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET event by ID
app.get('/api/events/:id', (req, res) => {
    try {
        const event = events.find(e => e.id === parseInt(req.params.id));
        if (!event) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }
        res.json({ success: true, event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// POST new event
app.post('/api/events', (req, res) => {
    try {
        const { name, date, description, category } = req.body;
        
        // Validate required fields
        if (!name || !date) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name and date are required' 
            });
        }

        // Create new event
        const newEvent = {
            id: events.length + 1,
            name,
            date,
            description: description || '',
            category: category || 'general'
        };

        events.push(newEvent);
        res.status(201).json({ success: true, event: newEvent });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT update event
app.put('/api/events/:id', (req, res) => {
    try {
        const { name, date, description, category } = req.body;
        const id = parseInt(req.params.id);
        
        const eventIndex = events.findIndex(e => e.id === id);
        if (eventIndex === -1) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        // Update event
        events[eventIndex] = {
            ...events[eventIndex],
            name: name || events[eventIndex].name,
            date: date || events[eventIndex].date,
            description: description || events[eventIndex].description,
            category: category || events[eventIndex].category
        };

        res.json({ success: true, event: events[eventIndex] });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// DELETE event
app.delete('/api/events/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const eventIndex = events.findIndex(e => e.id === id);
        
        if (eventIndex === -1) {
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        events.splice(eventIndex, 1);
        res.json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Filter events by category
app.get('/api/events/category/:category', (req, res) => {
    try {
        const { category } = req.params;
        const filteredEvents = events.filter(event => 
            event.category.toLowerCase() === category.toLowerCase()
        );
        res.json({ success: true, events: filteredEvents });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Search events
app.get('/api/events/search/:query', (req, res) => {
    try {
        const { query } = req.params;
        const searchResults = events.filter(event => 
            event.name.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase())
        );
        res.json({ success: true, events: searchResults });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});