const { ValidationError } = require('../utils/errors');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false });
  if (error) {
    const details = error.details.map((d) => d.message);
    return next(new ValidationError('Validation error', details));
  }
  req[property] = value;
  next();
};
module.exports = { validate };
