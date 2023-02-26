const { PeriodController } = require("../controllers/periodController");

class SessionController {
  static startSession = (time) => {
    PeriodController.createNewPeriods(time);
  };

  static calculateSessionResult = async () => {
    PeriodController.calculatePeriodResult();
  };

  static getAllSessions = async () => PeriodController.getAllPeriods();

  static async handleSession({ value = false } = {}) {
    const sessions = await this.getAllSessions();
    let hasSessionEnded;
    let startTime;

    // No previous data
    // We can simply create new Periods
    if (sessions.length == 0) {
      console.log("Empty List");
      hasSessionEnded = true;
      startTime = Date.now();
    }
    // Had previous data
    // Have to check for 2 cases
    // 1. Period ended the flow comes from recursive call
    // 2. Period has not ended and flow comes by restarting the sever
    else {
      const session = sessions[sessions.length - 1];
      const expireTime = session.expiredAt;

      if (expireTime <= Date.now()) {
        hasSessionEnded = true;
        startTime = Date.now();
      } else {
        hasSessionEnded = false;
        startTime = session.startTime;
      }
    }

    const calculateTime = startTime + (2 * 60 + 30) * 1000; // This will give startTime + 2:30 mins
    const expireTime = calculateTime + 30 * 1000; // This will give expire time - startTime + 3:00 mins

    if (hasSessionEnded) {
      this.startSession(startTime);
    }

    //This will Calculate the result of current session after 2:30 mins of start
    setTimeout(() => {
      return this.calculateSessionResult();
    }, calculateTime - Date.now());

    // This will go to next iteration of the loop after 3 mins of start
    setTimeout(() => {
      return this.handleSession({ value: true });
    }, expireTime - Date.now());
  }
}

module.exports.SessionController = SessionController;
