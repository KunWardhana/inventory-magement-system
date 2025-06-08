import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  app.use(express.static(path.join(__dirname, '../../public')));

  // Route untuk tes halaman login
app.get('/login', (req, res) => {
  res.render('login', { message: '' }); // default kosong
});
  // Route untuk tes halaman register
app.get('/register', (_req, res) => {
  res.render('register', { message: '' }); // default kosong
  });

  // Route default
  app.get('/', (_req, res) => {
    res.send('Hello from Express!');
  });
};
