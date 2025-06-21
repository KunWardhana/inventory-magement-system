import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getInputForm = (req, res) => {
  res.render(path.join(__dirname, '../../../../views/input.ejs'), {
    user: req.session.user
  });
};

export const postInputForm = (req, res) => {
  try {
    const { name, category, price, quantity, branch } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).send('Gambar produk wajib diunggah.');
    }

    // Log dummy result (simulate save to DB)
    console.log({
      name,
      category,
      price,
      quantity,
      branch,
      image: {
        originalname: image.originalname,
        mimetype: image.mimetype,
        size: image.size
      }
    });

    // Redirect back to dashboard after success
    return res.redirect('/user/dashboard');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Terjadi kesalahan saat menyimpan produk.');
  }
};
