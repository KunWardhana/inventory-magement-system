import { Router } from 'express';
import {
  changePassword, deleteUser, editUser, forgotPassword,
  getUser, login, logout, refreshToken, register,
  sendVerificationCode, verifyEmail,


} from '../controllers/user/index.js';
import { getDashboard } from '../controllers/dashboard/get-dashboard.js';
import { auth, imageUpload } from '../middlewares/index.js';
import { getInputForm, postInputForm } from '../controllers/input/input-product.js';


const router = Router();

// AUTH
router.post('/', register);
router.post('/login', login);
router.post('/register', login);
router.post('/logout', auth, logout);
router.post('/verify-email', verifyEmail);
router.post('/refresh-token', refreshToken);
router.post('/forgot-password', auth, forgotPassword);
router.post('/send-verification-code', sendVerificationCode);

// EDIT
router.post('/change-password', auth, changePassword);
router.put('/', auth, imageUpload, editUser);

router.get('/', auth, getUser);
router.delete('/', auth, deleteUser);
router.get('/dashboard', auth, getDashboard);


router.get('/input', auth, getInputForm);
router.post('/input', auth, imageUpload, postInputForm);

export default router;
