import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://api.open-notify.org/astros.json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching astronaut data:', error);
    res.status(500).json({ error: 'Failed to fetch astronaut data' });
  }
});

export default router;
