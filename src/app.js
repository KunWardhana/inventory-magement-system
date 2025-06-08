import express from 'express';
import expressLoader from './loaders/express.js';

const app = express();

// Jalankan express loader (middleware, routes, dll)
expressLoader(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
