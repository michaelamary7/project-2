const { Event } = require('../models');

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { userId: req.user.id } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving events', error });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const newEvent = await Event.create({ ...req.body, userId: req.user.id });
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const [updated] = await Event.update(req.body, {
      where: { id: req.params.id, userId: req.user.id }
    });
    if (updated) {
      const updatedEvent = await Event.findOne({ where: { id: req.params.id } });
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.destroy({
      where: { id: req.params.id, userId: req.user.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};