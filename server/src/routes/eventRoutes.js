const express = require('express');
const router = express.Router();
const { getEvents, addEvent, updateEvent, deleteEvent } = require('../controllers/eventController');

router.get('/', getEvents);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;