const { Status } = require("../common/Constants");

class ResponseService {
  static success(res, message, data) {
    res.status(200).send({
      status: Status.success,
      statusCode: 200,
      message: message,
      data: data,
    });
  }

  static failed(res, message, code) {
    res.status(code).send({
      status: Status.error,
      statusCode: code,
      message: message,
    });
  }
}

module.exports.ResponseService = ResponseService;
