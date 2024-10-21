const express = require('express');
const axios = require('axios');
const router = express.Router();

// Route to get holidays from Calendarific
router.get('/api/holidays', async (req, res) => {
  const { country, year } = req.query;

  try {
    // Make the API call to Calendarific
    const response = await axios.get('https://calendarific.com/api/v2/holidays', {
      params: {
        api_key: process.env.CALENDARIFIC_API_KEY, // Use environment variable for the API key
        country,
        year,
      },
    });


    res.json(response.data);
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
