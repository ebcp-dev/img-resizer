'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./utility/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
/** @module src/validation/login */

/** Import Validator dependency. */
var validateLoginInput = function validateLoginInput(data) {
  /** Define errors object. */
  var errors = {};

  /** Replace values to empty string if object key is empty. */
  data.username = !(0, _isEmpty2.default)(data.username) ? data.username : '';
  data.password = !(0, _isEmpty2.default)(data.password) ? data.password : '';

  /** Set username value to required error message if empty. */
  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'Username is required.';
  }

  /** Set passport value to required error message if empty. */
  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};
/** Import isEmpty custom function*/
exports.default = validateLoginInput;
//# sourceMappingURL=login.js.map