/** @module src/validation/jsonpatch */

/** Import Validator dependency. */
import Validator from 'validator';
/** Import isEmpty custom function*/
import isEmpty from './utility/is-empty';

/**
 * Function to validate arguments.
 * Checks if arguments are empty or invalid and returns an error object
 * and a boolean value whether the error object is empty or not.
 */
const validateJsonPatch = data => {
  /** Define errors object. */
  let errors = {};

  /** Replace values to empty string if object key is empty. */
  data.op = !isEmpty(data.op) ? data.op : '';
  data.path = !isEmpty(data.path) ? data.path : '';
  data.value = !isEmpty(data.value) ? data.value : '';

  /** Set op to required error message if empty. */
  if (Validator.isEmpty(data.op)) {
    errors.op = 'Operation is required.';
  }

  /** Set op to invalid error message if operation is not valid. */
  if (
    data.op !== 'add' &&
    data.op !== 'remove' &&
    data.op !== 'replace' &&
    data.op !== 'move' &&
    data.op !== 'copy' &&
    data.op !== 'test'
  ) {
    errors.op = 'Operation is not valid.';
  }

  /** Set path value to required error message if empty. */
  if (Validator.isEmpty(data.path)) {
    errors.path = 'Path is required.';
  }

  /** Set value value to required error message if empty. */
  if (
    (data.op === 'add' || data.op === 'replace' || data.op === 'test') &&
    Validator.isEmpty(data.value)
  ) {
    errors.value = 'Value is required.';
  }

  /** Return errors object and isValid boolean value. */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateJsonPatch;
