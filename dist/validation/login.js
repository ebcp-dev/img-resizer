'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./utility/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateLoginInput = function validateLoginInput(data) {
  var errors = {};

  data.username = !(0, _isEmpty2.default)(data.username) ? data.username : '';
  data.password = !(0, _isEmpty2.default)(data.password) ? data.password : '';

  if (_validator2.default.isEmpty(data.username)) {
    errors.username = 'Username is required.';
  }

  if (_validator2.default.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateLoginInput;
//# sourceMappingURL=login.js.map