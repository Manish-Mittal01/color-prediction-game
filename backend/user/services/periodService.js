const { periodNames } = require("../common/Constants");
const PeriodModel = require("../Models/PeriodModel");
const { ResponseService } = require("./responseService");

class PeriodService {
  /**This method will be used to calculate result after period is finished*/
  static calculatePeriodResult() {}

  /**This function is to return an object for class PeriodTimer */
  static makePeriodObject(periodname, periodId, time) {
    return {
      periodName: periodname,
      periodId: periodId,
      startTime: time,
      expireAt: time + 3 * 60 * 1000,
    };
  }

  static getPeriodIds(time) {
    return [1, 2, 3, 4].map((e) => `${time}${e}`).map((e) => parseInt(e));
  }

  static async createNewPeriods(time) {
    const periodIds = this.getPeriodIds(time);

    periodIds.forEach(async (id, index) => {
      PeriodModel(this.makePeriodObject(periodNames[index], id, time)).save();
    });
  }

  static async getCurrentSession(req, res) {
    const periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
    ResponseService.success(res, "Active Period", periods);
  }
}

module.exports.PeriodService = PeriodService;
