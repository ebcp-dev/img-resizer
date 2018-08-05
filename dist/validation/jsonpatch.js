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
/** @module src/validation/jsonpatch */

/** Import Validator dependency. */
var validateJsonPatch = function validateJsonPatch(data) {
  /** Define errors object. */
  var errors = {};

  /** Replace values to empty string if object key is empty. */
  data.op = !(0, _isEmpty2.default)(data.op) ? data.op : '';
  data.path = !(0, _isEmpty2.default)(data.path) ? data.path : '';
  data.value = !(0, _isEmpty2.default)(data.value) ? data.value : '';

  /** Set op to required error message if empty. */
  if (_validator2.default.isEmpty(data.op)) {
    errors.op = 'Operation is required.';
  }

  /** Set op to invalid error message if operation is not valid. */
  if (data.op !== 'add' && data.op !== 'remove' && data.op !== 'replace' && data.op !== 'move' && data.op !== 'copy' && data.op !== 'test') {
    errors.op = 'Operation is not valid.';
  }

  /** Set path value to required error message if empty. */
  if (_validator2.default.isEmpty(data.path)) {
    errors.path = 'Path is required.';
  }

  /** Set value value to required error message if empty. */
  if ((data.op === 'add' || data.op === 'replace' || data.op === 'test') && _validator2.default.isEmpty(data.value)) {
    errors.value = 'Value is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};
/** Import isEmpty custom function*/
exports.default = validateJsonPatch;
//# sourceMappingURL=jsonpatch.js.map