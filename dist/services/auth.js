'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _login = require('../validation/login');

var _login2 = _interopRequireDefault(_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var Keys = require('../config/keys');

// Validation imports


// User sign in route
router.post('/login', function (req, res) {
  var _validateLoginInput = (0, _login2.default)(req.body),
      errors = _validateLoginInput.errors,
      isValid = _validateLoginInput.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  var payload = {
    username: req.body.username,
    password: req.body.password
  };
  // Sign token
  _jsonwebtoken2.default.sign(payload, Keys.secretOrKey, { expiresIn: 3600 }, function (err, token) {
    return res.status(200).json({
      success: true,
      session: 'Bearer ' + token
    });
  });
});

exports.default = router;
//# sourceMappingURL=auth.js.map