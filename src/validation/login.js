/** @module src/validation/login */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateLoginInput = data => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  /** Set username value to required error message if empty. */
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required.';
  }

  /** Set passport value to required error message if empty. */
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateLoginInput;
