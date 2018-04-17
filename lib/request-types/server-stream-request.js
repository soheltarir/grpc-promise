const grpc = require('grpc');

class ServerStreamRequest {

  constructor (client, original_function) {
    this.queue = [];
    this.client = client;
    this.original_function = original_function;
  }

  sendMessage (content = {}, metadata = {}) {
    let grpcMetadata = new grpc.Metadata();
    for (let key in metadata) {
      grpcMetadata.set(key, metadata[key]);
    }
    return new Promise((resolve, reject) => {
      this.stream = this.original_function.call(this.client, content, grpcMetadata);
      this.stream.on('error', error => {
        reject(error);
      });
      this.stream.on('data', data => {
        this.queue.push(data);
      });
      this.stream.on('end', () => {
        resolve(this.queue);
      });
    });
  }

}

const makeServerStreamRequest = function (client, originalFunction) {
  return function () {
    return new ServerStreamRequest(client, originalFunction);
  };
};

module.exports = makeServerStreamRequest;
