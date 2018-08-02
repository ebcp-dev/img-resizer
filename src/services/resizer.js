/** @module src/services/resizer */

/** Import dependencies. */
import express from 'express';
import passport from 'passport';
import axios from 'axios';
import sharp from 'sharp';
import jsonpatch from 'json-patch';
const router = express.Router();

/** Import validation. */
import validateRequestBody from '../validation/resizer';

/**
 * @function post
 * Router post function for root url.
 * Downloads an image based on
 * image url from request body. Uses jwt authentication
 * and rejects unauthorized access.
 */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    /** Validate request body first.  */
    const { errors, isValid } = validateRequestBody(req.body);
    /** Return with error status if errors are found. */
    if (!isValid) {
      return res.status(400).json(errors);
    }

    /** Get image url from request body. */
    let { imgUrl } = req.body;
    /** Set response to type to image jpg. */
    res.type('jpg');
    /** Resize image then pipe it to response object. */
    download(imgUrl).then(response => response.pipe(transform()).pipe(res));
  }
);

/** Download function with axios.
 * Set response type to stream for large data.
 */
const download = url =>
  axios({
    method: 'get',
    url,
    responseType: 'stream'
  }).then(response => response.data);

/** Transform function with Sharp.
 * Resizes image to 50x50 pixels
 * and returns it.
 */
const transform = () => {
  const sharpObj = sharp();
  sharpObj.resize(50, 50);
  return sharpObj;
};

export default router;
