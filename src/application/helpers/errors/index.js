const BasicError = require('./BasicError');
const UnauthorizedError = require('./UnauthorizedError');
const ResourceNotFoundError = require('./ResourceNotFoundError');
const BadRequestError = require('./BadRequestError');
const ParameterError = require('./ParameterError');
const UnsupportedMediaTypeError = require('./UnsupportedMediaTypeError');

module.exports = {
  BasicError,
  BadRequestError,
  UnauthorizedError,
  ResourceNotFoundError,
  ParameterError,
  UnsupportedMediaTypeError,
};
