/** @module src/validation/utility/is-empty */

/**
 * Function that checks if value is empty.
 * @param {string/object} value - to be validated
 */
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);

export default isEmpty;
