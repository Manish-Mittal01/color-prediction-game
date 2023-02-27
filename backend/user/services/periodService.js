const {
  periodNames,
  StatusCode,
  ColorNumbers,
} = require("../../common/Constants");
const { Utility } = require("../../common/utility");
const PeriodModel = require("../Models/PeriodModel");
const { ResponseService } = require("../../common/responseService");
const { SessionController } = require("../controllers/sessionController");
const { WalletController } = require("../controllers/walletController");
const Bet = require("../Models/betModel");

class PeriodService {
  static async _updatePeriod({ periodId, resultColor }) {
    const minPrice = 41123;
    const maxPrice = 49152;
    const price = Math.floor(
      Math.random() * (maxPrice - minPrice + 1) + minPrice
    );
    let resultNumber;
    if (resultColor === "red") {
      resultNumber = Utility.getRandomValue(ColorNumbers.red);
    } else if (resultColor === "green") {
      resultNumber = Utility.getRandomValue(ColorNumbers.green);
    } else if (resultColor === "voilet") {
      resultNumber = Utility.getRandomValue(ColorNumbers.voilet);
    }
    const period = PeriodModel.updateOne(
      { periodId: periodId },
      {
        price: price,
        resultColor: resultColor,
        resultNumber: resultNumber,
      }
    );
  }

  /**This method will be used to calculate result after period is finished*/
  static async calculatePeriodResult() {
    // 1. Get Current Period
    let periods = [];
    if (SessionController.currentSession !== undefined) {
      periods = SessionController.currentSession;
    } else {
      periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
      periods.reverse();
      SessionController.currentSession = periods;
    }

    // 2. Fetch Data of all bets of current period
    const parity = [];
    const sapre = [];
    const bcone = [];
    const emred = [];
    const periodsList = [parity, sapre, bcone, emred];
    periodNames.forEach(async (name, index) => {
      const result = await Bet.find({
        periodName: name,
        periodId: periods[index].periodId,
      });
      periodsList[index] = [...periodsList[index], ...result];
    });

    // 3. Calculating winning color and its respective number
    // This loop is on list of periods
    periodsList.forEach((period, i) => {
      if (period.length == 0) {
        const color = Utility.getRandomValue(["red", "green", "voilet"]);
        this._updatePeriod({
          periodId: periods[i].periodId,
          resultColor: color,
        });
      }

      const redList = [];
      const voiletList = [];
      const greenList = [];
      let redAmount = 0;
      let voiletAmount = 0;
      let greenAmount = 0;
      //This loop is on list of bets on each period
      period.forEach((bet, j) => {
        // This means prediction is a color
        if (isNaN(bet.prediciton)) {
          if (bet.prediciton === "red") {
            redAmount += bet.amount;
            redList.push(bet);
          } else if (bet.prediciton === "green") {
            greenAmount += bet.amount;
            greenList.push(bet);
          } else if (bet.prediciton === "voilet") {
            voiletAmount += bet.amount;
            voiletList.push(bet);
          }
        }
        // This means prediction is a number
        else {
          if (ColorNumbers.red.includes(Number(bet.prediciton))) {
            redAmount += bet.amount;
            redList.push(bet);
          } else if (ColorNumbers.green.includes(Number(bet.prediciton))) {
            greenAmount += bet.amount;
            greenList.push(bet);
          } else if (ColorNumbers.voilet.includes(Number(bet.prediciton))) {
            voiletAmount += bet.amount;
            voiletList.push(bet);
            if (Number(bet.prediciton) === 0) {
              redAmount += bet.amount;
              redList.push(bet);
            } else {
              greenAmount += bet.amount;
              greenList.push(bet);
            }
          }
        }

        let winUpdateMultiple;
        let winningList;

        if (redAmount <= greenAmount && redAmount <= voiletAmount) {
          this._updatePeriod({ periodId: periods[i], resultColor: "red" });
          winningList = redList;
          winUpdateMultiple = 2;
        } else if (greenAmount <= redAmount && greenAmount <= voiletAmount) {
          this._updatePeriod({ periodId: periods[i], resultColor: "green" });
          winningList = greenList;
          winUpdateMultiple = 2;
        } else if (voiletAmount <= redAmount && voiletAmount <= greenAmount) {
          this._updatePeriod({ periodId: periods[i], resultColor: "voilet" });
          winningList = voiletList;
          winUpdateMultiple = 4.5;
        }

        winningList.forEach((winner) => {
          Bet.updateMany({ _id: winner._id }, { didWon: true });
          let amount;
          if (isNaN(bet.prediciton)) {
            amount = winner.amount * 0.95 * winUpdateMultiple;
          } else {
            amount = winner.amount * 0.95 * 9;
          }
          WalletController.updateWalletWinningAmount({
            userId: winner.userId,
            amount: amount,
          });
        });
      });
    });
  }

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
      SessionController.currentSession = periods;
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
      const obj = {
        periodId: model.periodId,
        price: model.price,
        resultNumber: model.resultNumber,
        resultColor: model.resultColor,
        startTime: model.startTime,
        expiredAt: model.expiredAt,
      };
      return obj;
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
