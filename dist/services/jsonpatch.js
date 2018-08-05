'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonPatch = require('json-patch');

var _jsonPatch2 = _interopRequireDefault(_jsonPatch);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _jsonpatch = require('../validation/jsonpatch');

var _jsonpatch2 = _interopRequireDefault(_jsonpatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/** Import validation function. */
/** @module src/services/jsonpatch */

/** Import dependencies. */


/**
 * @function patch
 * Router post function for / route.
 * Receives a json object from request body
 * and returns a patched json object.
 */
router.post('/', _passport2.default.authenticate('jwt', { session: false }), function (req, res) {
  /** Validate request body first. */
  var _validateJsonPatch = (0, _jsonpatch2.default)(req.body),
      errors = _validateJsonPatch.errors,
      isValid = _validateJsonPatch.isValid;
  /** Respond with errors and 400 status if errors found. */


  if (!isValid) {
    return res.status(400).json(errors);
  }
  /** Get json object to patch from request body. */
  var patched = _jsonPatch2.default.apply(req.body.obj, [{
    op: req.body.op,
    path: req.body.path,
    value: req.body.value
  }]);
  return res.status(200).json(patched);
});

exports.default = router;
//# sourceMappingURL=jsonpatch.js.map