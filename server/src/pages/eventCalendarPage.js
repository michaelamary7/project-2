// eventCalendarPage.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5173; // Match the port in your client code

// Middleware
app.use(cors());
app.use(express.json());

// Holiday/Events API endpoint
app.get('/api/holidays', async (req, res) => {
    const country = req.query.country || 'US';
    const year = req.query.year || new Date().getFullYear();

    try {
        // You would need to sign up for an API key from a holiday API service
        const API_KEY = process.env.HOLIDAY_API_KEY;

        // Example using abstractapi.com's Holiday API
        const response = await axios.get(
            `https://holidays.abstractapi.com/v1/`, {
                params: {
                    api_key: API_KEY,
                    country: country,
                    year: year
                }
            }
        );

        // Transform the data to include additional details
        const transformedHolidays = response.data.map(holiday => ({
            name: holiday.name,
            date: {
                iso: holiday.date
            },
            description: holiday.description || '',
            type: holiday.type || 'holiday',
            locations: holiday.locations || 'All',
            // Add any additional fields you want to include
        }));

        // Send the transformed data
        return res.json({
            response: {
                holidays: transformedHolidays
            }
        });

    } catch (error) {
        console.error('Holiday API Error:', error);
        
        // Send appropriate error response
        return res.status(error.response?.status || 500).json({
            message: 'Error fetching holiday data',
            error: error.message
        });
    }
});

// Test endpoint
app.get('/test', (req, res) => {
    res.json({ message: 'Calendar server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Optional: Add mock data for testing without an API
const mockHolidays = [
    {
        name: "New Year's Day",
        date: {
            iso: "2024-01-01"
        },
        description: "First day of the year",
        type: "National Holiday"
    },
    {
        name: "Martin Luther King Jr. Day",
        date: {
            iso: "2024-01-15"
        },
        description: "Birthday of Martin Luther King Jr.",
        type: "National Holiday"
    }
    // Add more mock holidays as needed
];

// Uncomment and modify the API endpoint to use mock data for testing
/*
app.get('/api/holidays', (req, res) => {
    res.json({
        response: {
            holidays: mockHolidays
        }
    });
});
*/