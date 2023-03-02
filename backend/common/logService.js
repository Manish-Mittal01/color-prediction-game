class LogService {
  static updateLog(position, err, docs) {
    if (err) {
      console.log(`[${position} Error] ${JSON.stringify(err)}`);
    } else {
      console.log(`[${position} Success] ${JSON.stringify(docs)}`);
    }
  }
}

module.exports.LogService = LogService;
