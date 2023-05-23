import constants from "../constant.js";
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: " Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORIZED:
      res.json({
        title: "UnAuthorized",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
};
export default errorHandler;
