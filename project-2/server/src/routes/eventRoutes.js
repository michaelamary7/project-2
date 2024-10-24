import { Router } from 'express';
import { getEvents, addEvent, updateEvent, deleteEvent } from '../controllers/eventController';
const router = Router();
import { createEvent, getUserEvents } from '../controllers/eventController';
import authenticate from '../middleware/authenticate';


router.get('/', getEvents);
router.post('/', addEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);
router.use(authenticate); 
router.post('/', createEvent);
router.get('/', getUserEvents);


export default router;