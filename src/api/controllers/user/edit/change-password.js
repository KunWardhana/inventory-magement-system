import { User } from '../../../../models/index.js';
import { validateChangePassword } from '../../../validators/user.validator.js';
import { errorHelper, logger, getText } from '../../../../utils/index.js';
import bcrypt from 'bcryptjs';

export default async (req, res) => {
  // Validate payload
  const { error } = validateChangePassword(req.body);
  if (error) {
    return res.status(400).json(errorHelper('00069', req, error.details[0].message));
  }

  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return res.status(400).json(errorHelper('00073', req));
  }

  // Get current user
  const user = await User.findById(req.user._id).select('password').catch((err) => {
    return res.status(500).json(errorHelper('00070', req, err.message));
  });

  if (!user) {
    return res.status(404).json(errorHelper('00077', req, 'User not found'));
  }

  // Check old password
  const match = await bcrypt.compare(oldPassword, user.password).catch((err) => {
    return res.status(500).json(errorHelper('00071', req, err.message));
  });

  if (!match) {
    return res.status(400).json(errorHelper('00072', req));
  }

  // Hash new password
  const hashed = await bcrypt.hash(newPassword, 10).catch((err) => {
    return res.status(500).json(errorHelper('00074', req, err.message));
  });

  // Save new password
  user.password = hashed;
  await user.save().catch((err) => {
    return res.status(500).json(errorHelper('00075', req, err.message));
  });

  logger('00076', req.user._id, getText('en', '00076'), 'Info', req);

  return res.status(200).json({
    resultMessage: {
      en: getText('en', '00076'),
      tr: getText('tr', '00076'),
    },
    resultCode: '00076',
  });
};
