const PeriodModel = require("../Models/PeriodModel");

class SessionController {
  static currentSession;

  static async getCurrentSession() {
    if (SessionController.currentSession !== undefined) {
      return SessionController.currentSession;
    } else {
      const periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
      // periods.reverse();
      SessionController.currentSession = periods;
      return periods;
    }
  }
}

module.exports.SessionController = SessionController;
