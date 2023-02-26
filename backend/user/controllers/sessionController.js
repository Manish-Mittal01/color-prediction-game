const { PeriodController } = require("../controllers/periodController");

class SessionController {
  static startSession = (time) => {
    PeriodController.createNewPeriods(time);
  };

  static calculateSessionResult = async () => {
    PeriodController.calculatePeriodResult();
  };

  static handleSession() {
    const startTime = Date.now();
    const calculateTime = startTime + (2 * 60 + 30) * 1000; // This will give startTime + 2:30 mins
    const expireTime = calculateTime + 30 * 1000; // This will give expire time -

    this.startSession(startTime);

    //This will Calculate the result of current session after 2:30 mins of start
    setTimeout(() => {
      return this.calculateSessionResult();
    }, calculateTime - Date.now());

    // This will go to next iteration of the loop after 3 mins of start
    setTimeout(() => {
      return this.handleSession();
    }, expireTime - Date.now());
  }
}

module.exports.SessionController = SessionController;
