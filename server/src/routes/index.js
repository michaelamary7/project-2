const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/users', userRoutes);
router.use('/events', authenticateToken, eventRoutes);

module.exports = router;
