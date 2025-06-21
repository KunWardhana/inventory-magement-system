import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDashboard = (req, res) => {
  res.render(path.join(__dirname, '../../../../views/dashboard.ejs'), {
    user: req.session.user
  });
};