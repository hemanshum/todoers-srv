import AppError from '../utils/appError.js';

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOprational) {
    console.log('Here');
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message || 'Invalid ID',
    });
  } else {
    console.error('ERROR 💥 ', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

export default (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
