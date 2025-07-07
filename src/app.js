// app.js
import express from 'express';
import session from 'express-session';
import expressLoader from './loaders/express.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setup session
app.use(session({
  secret: 'rahasia_kamu', // Ganti di production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true jika pakai HTTPS
}));

// Setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Jalankan express loader
expressLoader(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});
