import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

const Keys = require('../config/keys');

// Validation imports
import validateLoginInput from '../validation/login';

// User sign in route
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const payload = {
    username: req.body.username,
    password: req.body.password
  };
  // Sign token
  jwt.sign(payload, Keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
    return res.status(200).json({
      success: true,
      session: 'Bearer ' + token
    });
  });
});

export default router;
