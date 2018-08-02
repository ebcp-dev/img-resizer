'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _keys = require('../config/keys');

var _login = require('../validation/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @module src/services/auth */

/** Import dependencies. */
var router = _express2.default.Router();

/** Import secretOrKey option from config/keys. */


/** Import validation function. */


/**
 * @function login
 * Router post function for /login route.
 * Gets user login credentials from request body
 * and creates a signed token from it.
 */
router.post('/login', function (req, res) {
  /** Validate request body first. */
  var _validateLoginInput = (0, _login2.default)(req.body),
      errors = _validateLoginInput.errors,
      isValid = _validateLoginInput.isValid;
  /** Respond with errors and 400 status if errors found. */


  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Get user credentials from request body. */
  var payload = {
    username: req.body.username,
    password: req.body.password
  };
  /** Pass in user credentials as payload and sign token.
   * Return true if successful along with session token.
   * Set token expiration to 1 hour.
   */
  _jsonwebtoken2.default.sign(payload, _keys.secretOrKey, { expiresIn: 3600 }, function (err, token) {
    return res.status(200).json({
      success: true,
      session: 'Bearer ' + token
    });
  });
});

exports.default = router;
//# sourceMappingURL=auth.js.map