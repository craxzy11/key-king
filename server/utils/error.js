class ErrorHandler extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  const modelErrorHandler = (err, next) => {
    if (err.errors) {
      const keys = Object.keys(err.errors);
      console.log(keys)
      if (keys.length > 0) {
        const firstField = keys[0];
        const error = err.errors[firstField];
        console.log(error);
        if (error.name == "CastError") {
          return next(new ErrorHandler(`Invalid Format of ${error.path}!`, 400));
        } else {
          return next(new ErrorHandler(error.message, 422));
        }
      }
    }
    next(err);
  }
  export { ErrorHandler, modelErrorHandler };