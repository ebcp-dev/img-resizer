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

/** Import validation. */
/** @module src/services/resizer */

/** Import dependencies. */


/**
 * @function post
 * Router post function for root url.
 * Downloads an image based on
 * image url from request body. Uses jwt authentication
 * and rejects unauthorized access.
 */
router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  /** Validate request body first.  */
  var _validateRequestBody = (0, _resizer2.default)(req.body),
      errors = _validateRequestBody.errors,
      isValid = _validateRequestBody.isValid;
  /** Return with error status if errors are found. */


  if (!isValid) {
    return res.status(400).json(errors);
  }

  /** Get image url from request body. */
  var imgUrl = req.body.imgUrl;
  /** Set response to type to image jpg. */

  res.type('jpg');
  /** Resize image then pipe it to response object. */
  download(imgUrl).then(function (response) {
    return response.pipe(transform()).pipe(res);
  });
});

/** Download function with axios.
 * Set response type to stream for large data.
 */
var download = function download(url) {
  return (0, _axios2.default)({
    method: 'get',
    url: url,
    responseType: 'stream'
  }).then(function (response) {
    return response.data;
  });
};

/** Transform function with Sharp.
 * Resizes image to 50x50 pixels
 * and returns it.
 */
var transform = function transform() {
  var sharpObj = (0, _sharp2.default)();
  sharpObj.resize(50, 50);
  return sharpObj;
};

exports.default = router;
//# sourceMappingURL=resizer.js.map