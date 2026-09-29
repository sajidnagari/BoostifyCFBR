import express from 'express';
import cors from 'cors';

const app = express();
const port = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'api' });
});

app.get('/api/summary', (_req, res) => {
  res.json({
    message: 'Comment Growth AI API is ready.',
    features: ['dashboard', 'posts', 'comments', 'opportunities', 'analytics'],
  });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
