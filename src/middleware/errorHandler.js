export const errorHandler = (error, req, res, next) => {
  const status = error.status || error.statusCode || 500;

  res.status(status).json({
    message: error.message || 'Internal Server Error',
  });
};
