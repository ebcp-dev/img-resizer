/** @module src/validation/resizer */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if argument is empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateRequestBody = data => {
  /** Define errors object. */
  let errors = {};

  /** Replace value to empty string if object key is empty. */
  data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : '';

  /** Set imgUrl key to required error message if empty. */
  if (Validator.isEmpty(data.imgUrl)) {
    errors.imgUrl = 'Image URL is required.';
  }

  /** Set imgUrl key to invalid error message if invalid. */
  if (!Validator.isURL(data.imgUrl)) {
    errors.imgUrl = 'Invalid URL.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRequestBody;
