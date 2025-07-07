// src/loaders/express.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from '../api/routes/user.js';     // API routes
import viewRoutes from '../api/routes/views.js';    // View rendering routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (app) => {
  // Setup view engine
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  // Setup public assets (CSS, images, dll)
  app.use(express.static(path.join(__dirname, '../../public')));

  // Parsing body
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Register routes
  app.use('/', userRoutes);  // API login/logout/register
  app.use('/', viewRoutes);  // Render EJS login, generic, register, homepage

  // Fallback default
  app.get('/', (_req, res) => {
    res.send('Hello from Express!');
  });
};
