const buildMetadata = require('../metadata');

class UnaryRequest {

  constructor (client, original_function) {
    this.client = client;
    this.original_function = original_function;
  }

  sendMessage (content = {}, metadata = {}) {
    return new Promise((resolve, reject) => {
      this.original_function.call(this.client, content, buildMetadata(metadata), function (error, response) {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

}

const makeUnaryRequest = function (client, originalFunction) {
  return function () {
    return new UnaryRequest(client, originalFunction);
  };
};

module.exports = makeUnaryRequest;
