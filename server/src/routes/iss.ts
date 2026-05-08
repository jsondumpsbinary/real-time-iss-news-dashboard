import { Router } from 'express';
import axios from 'axios';

const router = Router();

let cachedData: any = null;
let lastFetchTime = 0;

router.get('/', async (req, res) => {
  try {
    const now = Date.now();
    // Cache for 5 seconds to prevent rate limits from double-renders
    if (!cachedData || now - lastFetchTime > 5000) {
      const response = await axios.get('https://api.wheretheiss.at/v1/satellites/25544');
      cachedData = response.data;
      lastFetchTime = now;
    }
    
    // Map to open-notify format but add speed
    res.json({
      iss_position: {
        latitude: cachedData.latitude,
        longitude: cachedData.longitude
      },
      timestamp: cachedData.timestamp,
      speed: cachedData.velocity, // Add exact velocity from API
      message: 'success'
    });
  } catch (error: any) {
    console.error('Error fetching ISS data:', error?.message);
    res.status(500).json({ error: 'Failed to fetch ISS data' });
  }
});

export default router;
