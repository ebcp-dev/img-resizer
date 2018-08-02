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
 * Checks if argument is empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
/** @module src/validation/resizer */

/** Import Validator dependency. */
var validateRequestBody = function validateRequestBody(data) {
  /** Define errors object. */
  var errors = {};

  /** Replace value to empty string if object key is empty. */
  data.imgUrl = !(0, _isEmpty2.default)(data.imgUrl) ? data.imgUrl : '';

  /** Set imgUrl key to required error message if empty. */
  if (_validator2.default.isEmpty(data.imgUrl)) {
    errors.imgUrl = 'Image URL is required.';
  }

  /** Set imgUrl key to invalid error message if invalid. */
  if (!_validator2.default.isURL(data.imgUrl)) {
    errors.imgUrl = 'Invalid URL.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};
/** Import isEmpty custom function*/
exports.default = validateRequestBody;
//# sourceMappingURL=resizer.js.map