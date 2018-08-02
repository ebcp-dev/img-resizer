import express from 'express';
import passport from 'passport';
import axios from 'axios';
import sharp from 'sharp';
import jsonpatch from 'json-patch';
const router = express.Router();

// Validation imports
import validateRequestBody from '../validation/resizer';

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateRequestBody(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Download image with axios
    const download = url =>
      axios({
        method: 'get',
        url,
        responseType: 'stream'
      }).then(response => response.data);

    // Get image source
    let { imgUrl } = req.body;
    // Set response type to .jpg
    res.type('jpg');
    // Download image and pipe to response
    download(imgUrl).then(response => response.pipe(transform()).pipe(res));
  }
);

// Resize image with Sharp
const transform = () => {
  const sharpObj = sharp();
  sharpObj.resize(50, 50);
  return sharpObj;
};

export default router;
