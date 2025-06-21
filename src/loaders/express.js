import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import imageUpload from '../api/middlewares/image-upload.js'; // adjust path as needed


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

  app.get('/dashboard', (_req, res) => {
    res.render('dashboard', { message: '' }); 
    });

  app.get('/input', (_req, res) => {
      res.render('input', {
        user: {
          name: 'Admin Dummy', // or req.session.user if available
          role: 'admin'
        }
      });
    });
    app.post('/input', imageUpload, (req, res) => {
      const { name, category, price, quantity, branch } = req.body;
      const image = req.file;
  
      if (!image) {
        return res.status(400).send('Image is required.');
      }
  
      console.log({
        name,
        category,
        price,
        quantity,
        branch,
        image: {
          originalname: image.originalname,
          mimetype: image.mimetype,
          size: image.size,
        },
      });
  
      return res.redirect('/dashboard'); // or wherever you want to go after input
    });

  // Route default
  app.get('/', (_req, res) => {
    res.send('Hello from Express!');
  });
};
