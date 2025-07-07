// src/api/routes/views.js
import { Router } from 'express';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login', { message: '' }); // default kosong
});

router.get('/register', (_req, res) => {
  res.render('register', { message: '' });
});

router.get('/homepage', (_req, res) => {
  res.render('homepage');
});

router.get('/generic', (req, res) => {
  const user = req.session?.user || null;
  res.render('generic', { user }); // pastikan user dikirim kalau ada session
});

export default router;
