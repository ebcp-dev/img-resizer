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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.env.PORT || 5000;

// Middleware
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_passport2.default.initialize());

// Passport config
require('./config/passport')(_passport2.default);

// API routes
app.use('/api/auth', require('./services/auth').default);
app.use('/api/resize', require('./services/resizer').default);

app.listen(port, function () {
  return console.log('Server running on port ' + port + '.');
});

exports.default = app;
//# sourceMappingURL=server.js.map