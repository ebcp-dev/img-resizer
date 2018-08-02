'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

var _jsonPatch = require('json-patch');

var _jsonPatch2 = _interopRequireDefault(_jsonPatch);

var _resizer = require('../validation/resizer');

var _resizer2 = _interopRequireDefault(_resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// Validation imports


router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  var _validateRequestBody = (0, _resizer2.default)(req.body),
      errors = _validateRequestBody.errors,
      isValid = _validateRequestBody.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Download image with axios
  var download = function download(url) {
    return (0, _axios2.default)({
      method: 'get',
      url: url,
      responseType: 'stream'
    }).then(function (response) {
      return response.data;
    });
  };

  // Get image source
  var imgUrl = req.body.imgUrl;
  // Set response type to .jpg

  res.type('jpg');
  // Download image and pipe to response
  download(imgUrl).then(function (response) {
    return response.pipe(transform()).pipe(res);
  });
});

// Resize image with Sharp
var transform = function transform() {
  var sharpObj = (0, _sharp2.default)();
  sharpObj.resize(50, 50);
  return sharpObj;
};

exports.default = router;
//# sourceMappingURL=resizer.js.map