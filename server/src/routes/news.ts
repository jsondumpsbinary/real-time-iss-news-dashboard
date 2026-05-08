import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { category = 'space' } = req.query;
    
    // Using Spaceflight News API (100% Free, No API Key required!)
    const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles/', {
      params: {
        search: category,
        limit: 15
      }
    });

    // Map response to match the existing frontend interface
    const mappedArticles = response.data.results.map((article: any) => ({
      title: article.title,
      description: article.summary,
      url: article.url,
      urlToImage: article.image_url, 
      source: { name: article.news_site },
      author: '',
      publishedAt: article.published_at
    }));

    res.json({ articles: mappedArticles });
  } catch (error: any) {
    console.error('Error fetching news:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch news data' });
  }
});

export default router;
