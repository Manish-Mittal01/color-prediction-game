class LogService {
  static updateLog(position, err, docs) {
    if (err) {
      console.log(`[SUCCESS ${position}] ${JSON.stringify(err)}`);
    } else {
      console.log(`[ERROR ${position}] ${JSON.stringify(docs)}`);
    }
  }
}

module.exports.LogService = LogService;
