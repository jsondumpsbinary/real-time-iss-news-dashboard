import { Router } from 'express';
import axios from 'axios';

const router = Router();

let cachedData: any = {
  latitude: 50.11496,
  longitude: 118.079,
  timestamp: Math.floor(Date.now() / 1000),
  velocity: 27600
};
let lastFetchTime = 0;

router.get('/', async (req, res) => {
  const now = Date.now();
  try {
    // Cache for 5 seconds to prevent rate limits from double-renders
    if (now - lastFetchTime > 5000) {
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
    // Backoff for 5 seconds even on error to prevent spamming the rate-limited API
    lastFetchTime = now;
    
    // Return cached or mock data so the dashboard doesn't break!
    res.json({
      iss_position: {
        latitude: cachedData.latitude,
        longitude: cachedData.longitude
      },
      timestamp: cachedData.timestamp,
      speed: cachedData.velocity,
      message: 'success (fallback cache)'
    });
  }
});

export default router;
