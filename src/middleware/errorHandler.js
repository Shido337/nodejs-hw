import createHttpError from 'http-errors';

export const errorHandler = (error, req, res, _next) => {
  if (createHttpError.isHttpError(error)) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};
