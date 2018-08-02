/** @module src/services/auth */

/** Import dependencies. */
import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

/** Import secretOrKey option from config/keys. */
import { secretOrKey } from '../config/keys';

/** Import validation function. */
import validateLoginInput from '../validation/login';

/**
 * @function login
 * Router post function for /login route.
 * Gets user login credentials from request body
 * and creates a signed token from it.
 */
router.post('/login', (req, res) => {
  /** Validate request body first. */
  const { errors, isValid } = validateLoginInput(req.body);
  /** Respond with errors and 400 status if errors found. */
  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Get user credentials from request body. */
  const payload = {
    username: req.body.username,
    password: req.body.password
  };
  /** Pass in user credentials as payload and sign token.
   * Return true if successful along with session token.
   * Set token expiration to 1 hour.
   */
  jwt.sign(payload, secretOrKey, { expiresIn: 3600 }, (err, token) => {
    return res.status(200).json({
      success: true,
      session: 'Bearer ' + token
    });
  });
});

export default router;
