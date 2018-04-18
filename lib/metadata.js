const grpc = require('grpc');

const buildMetadata = (metadata = {}) => {
  let grpcMetaData = new grpc.Metadata();
  for (let key in metadata) {
    if (metadata[key] === null || metadata[key] === undefined) {
      continue; 
    } else {
      grpcMetaData.set(key, metadata[key]);
    }
  }
  return grpcMetaData;
};

module.exports = buildMetadata;
