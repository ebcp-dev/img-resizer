/** @module src/services/jsonpatch */

/** Import dependencies. */
import express from 'express';
import jsonpatch from 'json-patch';
import passport from 'passport';
const router = express.Router();

/** Import validation function. */
import validateJsonPatch from '../validation/jsonpatch';

/**
 * @function patch
 * Router post function for / route.
 * Receives a json object from request body
 * and returns a patched json object.
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    /** Validate request body first. */
    const { errors, isValid } = validateJsonPatch(req.body);
    /** Respond with errors and 400 status if errors found. */
    if (!isValid) {
      return res.status(400).json(errors);
    }
    /** Get json object to patch from request body. */
    const patched = jsonpatch.apply(req.body.obj, [
      {
        op: req.body.op,
        path: req.body.path,
        value: req.body.value
      }
    ]);
    return res.status(200).json(patched);
  }
);

export default router;
