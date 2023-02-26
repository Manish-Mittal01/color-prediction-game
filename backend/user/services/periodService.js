const { periodNames } = require("../../common/Constants");
const PeriodModel = require("../Models/PeriodModel");
const { ResponseService } = require("../../common/responseService");

class PeriodService {
  /**This method will be used to calculate result after period is finished*/
  static calculatePeriodResult() {}

  /**This function is to return an object for class PeriodTimer */
  static makePeriodObject(periodname, periodId, time) {
    return {
      periodName: periodname,
      periodId: periodId,
      startTime: time,
      expiredAt: time + 3 * 60 * 1000,
    };
  }

  static makeResponseObject(model) {
    return {
      id: model._id,
      periodName: model.periodName,
      periodId: model.periodId,
      createdAt: model.createdAt,
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

  static async getAllPeriods(time) {
    const periods = await PeriodModel.find();
    // console.log(periods.length);
    return periods;
  }

  static async getCurrentSession(req, res) {
    const periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
    periods.reverse();
    const data = {
      startTime: periods[0].startTime,
      expiredAt: periods[0].expiredAt,
      Parity: this.makeResponseObject(periods[0]),
      Sapre: this.makeResponseObject(periods[1]),
      Bcone: this.makeResponseObject(periods[2]),
      Emred: this.makeResponseObject(periods[3]),
    };
    ResponseService.success(res, "Active Period", data);
  }
}

module.exports.PeriodService = PeriodService;
