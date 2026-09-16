class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;

    //capute the stacktrace
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
