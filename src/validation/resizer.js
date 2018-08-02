import Validator from 'validator';
import isEmpty from './utility/is-empty';

const validateRequestBody = data => {
  let errors = {};

  data.imgUrl = !isEmpty(data.imgUrl) ? data.imgUrl : '';

  if (Validator.isEmpty(data.imgUrl)) {
    errors.imgUrl = 'Image URL is required.';
  }

  if (!Validator.isURL(data.imgUrl)) {
    errors.imgUrl = 'Invalid URL.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRequestBody;
