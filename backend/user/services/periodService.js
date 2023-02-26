const { periodNames, StatusCode } = require("../../common/Constants");
const PeriodModel = require("../Models/PeriodModel");
const { ResponseService } = require("../../common/responseService");
const { SessionController } = require("../controllers/sessionController");

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

  static getPeriodIds(time) {
    return [1, 2, 3, 4].map((e) => `${time}${e}`).map((e) => parseInt(e));
  }

  static createNewPeriods(time) {
    const periodIds = this.getPeriodIds(time);
    const periods = [];

    periodIds.forEach(async (id, index) => {
      const period = PeriodModel(
        this.makePeriodObject(periodNames[index], id, time)
      );
      period.save();
      periods.push(period);
    });
    return periods;
  }

  static async getAllPeriods() {
    const periods = await PeriodModel.find();
    return periods;
  }

  static async getCurrentSession(req, res) {
    function makeResponseObject(model) {
      return {
        id: model._id,
        periodName: model.periodName,
        periodId: model.periodId,
        createdAt: model.createdAt,
      };
    }
    let periods;
    if (SessionController.currentSession !== undefined) {
      periods = SessionController.currentSession;
    } else {
      periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
      periods.reverse();
    }
    const data = {
      startTime: periods[0].startTime,
      expiredAt: periods[0].expiredAt,
      Parity: makeResponseObject(periods[0]),
      Sapre: makeResponseObject(periods[1]),
      Bcone: makeResponseObject(periods[2]),
      Emred: makeResponseObject(periods[3]),
    };
    ResponseService.success(res, "Active Period", data);
  }

  static async getHistory(req, res) {
    const periods = await PeriodModel.find()
      .limit(200 * 4)
      .sort({ _id: -1 });

    console.log(periods);

    if (periods.length == 0) {
      ResponseService.success(
        res,
        "No Periods Found",
        {},
        {
          code: StatusCode.noData,
        }
      );
      return;
    }

    function makeResponseObject(model) {
      return {
        periodId: model.periodId,
        price: model.price,
        resultNumber: model.resultNumber,
        resultColor: model.resultColor,
        startTime: model.startTime,
        expiredAt: model.expiredAt,
      };
    }

    const parity = [];
    const sapre = [];
    const bcone = [];
    const emred = [];

    periods.forEach((period) => {
      if (period.periodName === periodNames[0]) {
        parity.push(makeResponseObject(period));
      } else if (period.periodName === periodNames[1]) {
        sapre.push(makeResponseObject(period));
      } else if (period.periodName === periodNames[2]) {
        bcone.push(makeResponseObject(period));
      } else if (period.periodName === periodNames[3]) {
        emred.push(makeResponseObject(period));
      }
    });

    const data = {
      Parity: parity,
      Sapre: sapre,
      Bcone: bcone,
      Emred: emred,
    };

    ResponseService.success(res, "Periods Found", data);
  }
}

module.exports.PeriodService = PeriodService;
