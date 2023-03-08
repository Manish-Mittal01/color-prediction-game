const {
  periodNames,
  StatusCode,
  ColorNumbers,
} = require("../../common/Constants");
var mongo = require("mongodb");
const { Utility } = require("../../common/utility");
const PeriodModel = require("../Models/PeriodModel");
const { ResponseService } = require("../../common/responseService");
const { SessionController } = require("../controllers/sessionController");
const { WalletController } = require("../controllers/walletController");
const Bet = require("../Models/betModel");
const { LogService } = require("../../common/logService");

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
    } else if (resultColor === "violet green") {
      resultNumber = 5;
    } else if (resultColor === "violet red") {
      resultNumber = 0;
    }

    const currentPeriod = await PeriodModel.findOne({
      periodId: periodId,
    });
    if (currentPeriod && currentPeriod.isResultByAdmin) return;

    await PeriodModel.updateOne(
      { periodId: periodId },
      {
        $set: {
          price: price,
          resultColor: resultColor,
          resultNumber: resultNumber,
        },
      }
    ).then((err, docs) => {
      LogService.updateLog("PeriodResult", err, docs);
    });
  }

  /**This method will be used to calculate result after period is finished*/
  static async calculatePeriodResult(fromAdmin = false) {
    // 1. Get Current Period
    let periods = [];
    if (fromAdmin) {
      periods = await PeriodModel.find().limit(4).sort({ _id: -1 });
      SessionController.currentSession = periods;
    } else {
      periods = await SessionController.getCurrentSession();
    }
    periods.sort((a, b) => a.periodId - b.periodId);

    // 2. Fetch Data of all bets of current period
    const parity = [];
    const sapre = [];
    const bcone = [];
    const emred = [];
    const periodsList = [parity, sapre, bcone, emred];

    async function makePeriodList() {
      for (let index in periodNames) {
        const name = periodNames[index];
        const result = await Bet.find({
          periodName: name,
          periodId: periods[index].periodId,
        });
        periodsList.splice(index, 1, result);
      }
    }
    await makePeriodList();

    // 3. Calculating winning color and its respective number
    // This loop is on list of periods
    periodsList.forEach(async (periodBets, i) => {
      const period = periods[i];

      let winUpdateMultiple;
      let winningList;

      if (period.isResultByAdmin) {
        const matches = periodBets.filter(
          (bet) =>
            bet.prediction == period.resultNumber ||
            period.resultColor.includes(bet.prediction)
        );
        console.log(`Matches ${matches}`);
        winningList = matches;
        if (matches.length === 0) {
          winUpdateMultiple = 1;
        } else {
          if (
            matches[0].prediction === "red" ||
            matches[0].prediction === "green"
          ) {
            winUpdateMultiple = 2;
          } else if (matches[0].prediction === "violet") {
            winUpdateMultiple = 4.5;
          }
        }
      } else {
        if (periodBets.length == 0) {
          const color = Utility.getRandomValue([
            "red",
            "green",
            "violet green",
            "violet red",
          ]);
          return await this._updatePeriod({
            periodId: periods[i].periodId,
            resultColor: color,
          });
        }

        const redList = [];
        const violetList = [];
        const greenList = [];
        let redAmount = 0;
        let violetAmount = 0;
        let greenAmount = 0;
        //This loop is on list of bets on each period
        // periodBets.forEach((bet, j) =>
        for (let bet of periodBets) {
          // This means prediction is a color
          if (isNaN(bet.prediction)) {
            if (bet.prediction === "red") {
              redAmount += bet.betAmount;
              redList.push(bet);
            } else if (bet.prediction === "green") {
              greenAmount += bet.betAmount;
              greenList.push(bet);
            } else if (bet.prediction === "violet") {
              violetAmount += bet.betAmount;
              violetList.push(bet);
            }
          }
          // This means prediction is a number
          else {
            if (ColorNumbers.red.includes(Number(bet.prediction))) {
              redAmount += bet.betAmount;
              redList.push(bet);
            } else if (ColorNumbers.green.includes(Number(bet.prediction))) {
              greenAmount += bet.betAmount;
              greenList.push(bet);
            } else if (ColorNumbers.violet.includes(Number(bet.prediction))) {
              violetAmount += bet.betAmount;
              violetList.push(bet);
              if (Number(bet.prediction) === 0) {
                redAmount += bet.betAmount;
                redList.push(bet);
              } else {
                greenAmount += bet.betAmount;
                greenList.push(bet);
              }
            }
          }
        }

        async function checkWinningList() {
          if (redAmount <= greenAmount && redAmount <= violetAmount) {
            winningList = redList;
            winUpdateMultiple = 2;
            await PeriodService._updatePeriod({
              periodId: periods[i].periodId,
              resultColor: "red",
            });
          } else if (greenAmount <= redAmount && greenAmount <= violetAmount) {
            winningList = greenList;
            winUpdateMultiple = 2;
            await PeriodService._updatePeriod({
              periodId: periods[i].periodId,
              resultColor: "green",
            });
          } else if (violetAmount <= redAmount && violetAmount <= greenAmount) {
            winningList = violetList;
            winUpdateMultiple = 4.5;
            await PeriodService._updatePeriod({
              periodId: periods[i].periodId,
              resultColor: `violet ${Utility.getRandomValue(["red", "green"])}`,
            });
          }
        }
        await checkWinningList();
      }

      const looserList = periodBets.filter((e) => !winningList.includes(e));

      try {
        for await (const looser of looserList) {
          console.log(`[Looser] ${JSON.stringify(looser)}`);
          Bet.updateOne(
            { _id: looser._id },
            { $set: { didWon: false, resultAmount: Number(looser.betAmount) } }
          ).then((err, docs) => LogService.updateLog("BetLoser", err, docs));
        }

        for (let winnerBet of winningList) {
          const i = winningList.indexOf(winnerBet);
          let amount;
          if (isNaN(winnerBet.prediction)) {
            amount = winnerBet.betAmount * winUpdateMultiple;
          } else {
            amount = winnerBet.betAmount * 9;
          }
          console.log(
            `[WINNER] ${JSON.stringify(winnerBet)} ${amount} ${typeof amount}`
          );
          Bet.updateOne(
            { _id: winnerBet._id },
            { $set: { didWon: true, resultAmount: Number(amount) } }
          ).then((err, docs) => LogService.updateLog("BetWinner", err, docs));

          if (!fromAdmin) {
            await WalletController.updateWalletWinningAmount({
              userId: winnerBet.userId,
              amount: amount,
            });
          }
        }
      } catch (e) {
        console.log(`[CATCH] ${e}`);
      }
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
    SessionController.currentSession = periods;
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
    const periods = await SessionController.getCurrentSession();
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

    if (periods.length == 0) {
      ResponseService.success(res, "No Periods Found", {});
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
