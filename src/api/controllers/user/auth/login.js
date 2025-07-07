import { User, Token } from '../../../../models/index.js';
import { validateLogin } from '../../../validators/user.validator.js';
import {
  errorHelper, getText, logger,
  signAccessToken, signRefreshToken
} from '../../../../utils/index.js';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;

export default async (req, res) => {
  try {
    // ✅ Validasi input
    const { error } = validateLogin(req.body);
    if (error) {
      let code = '00038';
      if (error.details[0].message.includes('email'))
        code = '00039';
      else if (error.details[0].message.includes('password'))
        code = '00040';

      return res.status(400).render('login', {
        error: error.details[0].message,
        email: req.body.email
      });
    }

    // ✅ Cari user berdasarkan email
    const user = await User.findOne({
      email: req.body.email,
      isActivated: true,
      isVerified: true
    }).select('+password');

    if (!user) {
      return res.status(400).render('login', {
        error: 'User not found or inactive',
        email: req.body.email
      });
    }

    if (!user.isActivated) {
      return res.status(400).render('login', {
        error: 'User is not activated',
        email: req.body.email
      });
    }

    if (!user.isVerified) {
      return res.status(400).render('login', {
        error: 'User is not verified',
        email: req.body.email
      });
    }

    // ✅ Cek password
    const match = await compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).render('login', {
        error: 'Incorrect password',
        email: req.body.email
      });
    }

    // ✅ Buat access token dan refresh token
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);

    // ✅ Simpan refresh token ke DB
    try {
      await Token.updateOne(
        { userId: user._id },
        {
          $set: {
            refreshToken,
            status: true,
            expiresIn: Date.now() + 604800000, // 7 hari
            createdAt: Date.now()
          }
        },
        { upsert: true }
      );
    } catch (err) {
      return res.status(500).render('login', {
        error: 'Failed to save token',
        email: req.body.email
      });
    }

    // ✅ Simpan session & redirect
    req.session.user = user;
    logger('00047', user._id, getText('en', '00047'), 'Info', req);

    return res.render('generic', { user });
  } catch (err) {
    console.error('Login Error:', err);
    return res.status(500).render('login', {
      error: 'Internal server error',
      email: req.body.email
    });
  }
};
