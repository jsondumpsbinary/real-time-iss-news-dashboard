import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
    const data = response.data;
    
    // Map to open-notify format so frontend doesn't need to change
    res.json({
      iss_position: {
        latitude: data.latitude,
        longitude: data.longitude
      },
      timestamp: data.timestamp,
      message: 'success'
    });
  } catch (error: any) {
    console.error('Error fetching ISS data:', error?.message);
    res.status(500).json({ error: 'Failed to fetch ISS data' });
  }
});

export default router;
