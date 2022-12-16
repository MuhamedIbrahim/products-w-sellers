exports.catchAsync = (fn) => {
  return (req, res, next) => fn(req, res, next).catch(next);
};

exports.errorHandler = (error, _, res, __) => {
  // error filteration
  if (error.name === "SequelizeValidationError") {
    // format validation errors
    error.statusCode = 400;
    error.status = "failed";
    if (error.errors)
      error.message = error.errors.map((el) => el.message).join(". ");
  } else {
    error.statusCode = error.statusCode ?? 500;
    error.status =
      error.status ??
      (error.statusCode.toString().startsWith(4) ? "failed" : "error");
  }

  res.status(error.statusCode).json({
    staus: error.status,
    message: error.message,
  });
};

exports.appError = (message, status) => {
  const error = new Error(message);
  error.statusCode = status;
  throw error;
};
