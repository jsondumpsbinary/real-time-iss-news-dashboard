import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import issRoutes from './routes/iss';
import astronautsRoutes from './routes/astronauts';
import newsRoutes from './routes/news';
import chatRoutes from './routes/chat';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/iss', issRoutes);
app.use('/api/astronauts', astronautsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/chat', chatRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
