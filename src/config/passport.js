/** @module src/config/passport */

/** Import passport jwt strategy.  */
import passportJWT from 'passport-jwt';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
import { secretOrKey } from './keys';

/** Define options object to pass into JwtStrategy function. */
const opts = {};
/** Get token from Authorization Header. */
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

/**
 * Create new JwtStrategy with passport.
 * Returns the payload once authenticated.
 * @param {passport} passport
 */
const useJwt = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      return done(null, jwt_payload);
    })
  );
};

/** Export the function. */
export default useJwt;
