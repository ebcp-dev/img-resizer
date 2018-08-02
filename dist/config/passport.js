'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passportJwt = require('passport-jwt');

var _passportJwt2 = _interopRequireDefault(_passportJwt);

var _keys = require('./keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = _passportJwt2.default.Strategy; /** @module src/config/passport */

/** Import passport jwt strategy.  */

var ExtractJwt = _passportJwt2.default.ExtractJwt;


/** Define options object to pass into JwtStrategy function. */
var opts = {};
/** Get token from Authorization Header. */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys.secretOrKey;

/**
 * Create new JwtStrategy with passport.
 * Returns the payload once authenticated.
 * @param {passport} passport
 */
var useJwt = function useJwt(passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return done(null, jwt_payload);
  }));
};

/** Export the function. */
exports.default = useJwt;
//# sourceMappingURL=passport.js.map