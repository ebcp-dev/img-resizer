'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isEmpty = require('./utility/is-empty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validateRequestBody = function validateRequestBody(data) {
  var errors = {};

  data.imgUrl = !(0, _isEmpty2.default)(data.imgUrl) ? data.imgUrl : '';

  if (_validator2.default.isEmpty(data.imgUrl)) {
    errors.imgUrl = 'Image URL is required.';
  }

  if (!_validator2.default.isURL(data.imgUrl)) {
    errors.imgUrl = 'Invalid URL.';
  }

  return {
    errors: errors,
    isValid: (0, _isEmpty2.default)(errors)
  };
};

exports.default = validateRequestBody;
//# sourceMappingURL=resizer.js.map