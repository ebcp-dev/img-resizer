'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _passport3 = require('./config/passport');

var _passport4 = _interopRequireDefault(_passport3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Define express variable. */
/** @module src/server */

/** Import express and passport dependencies. */
var app = (0, _express2.default)();
/** Define environment port variable. */
var port = process.env.PORT || 5000;

/** Have express use middleware. */
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_passport2.default.initialize());

/** Import and use passport config. */

(0, _passport4.default)(_passport2.default);

/** Define API routes. */
app.use('/api/auth', require('./services/auth').default);
app.use('/api/resize', require('./services/resizer').default);

/** Server listen to port. */
app.listen(port, function () {
  return console.log('Server running on port ' + port + '.');
});

exports.default = app;
//# sourceMappingURL=server.js.map