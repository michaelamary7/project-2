require('dotenv').config();
import express, { json } from 'express';
import cors from 'cors';
import routes from './routes';
import { sequelize } from './models';


const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use('/api', routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});




import express from 'express';
const app = express();
import eventRoutes from './routes/eventRoutes';
import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';

app.use(json());

//Michela's code above

// Mount routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

export default app;

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
