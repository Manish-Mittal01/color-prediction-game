const { LogService } = require("../../common/logService");
const { ResponseService } = require("../../common/responseService");
const {
  SessionController,
} = require("../../user/controllers/sessionController");
const betModel = require("../../user/Models/betModel");
const PeriodModel = require("../../user/Models/PeriodModel");
const { PeriodService } = require("../../user/services/periodService");
const { ColorNumbers, periodNames } = require("../../common/Constants");

const { success, error } = require("../../common/Constants").Status;

module.exports.prediction = async (req, res) => {
  const { Parity, Sapre, Bcone, Emred } = req.body;

  async function updatePeriod(periodId, resultNumber) {
    const minPrice = 41123;
    const maxPrice = 49152;
    const price = Math.floor(
      Math.random() * (maxPrice - minPrice + 1) + minPrice
    );

    let resultColor = "";
    if (ColorNumbers.red.includes(Number(resultNumber))) {
      resultColor = "red";
    } else if (ColorNumbers.green.includes(Number(resultNumber))) {
      resultColor = "green";
    } else if (resultNumber == 0) {
      resultColor = "violet red";
    } else if (resultNumber == 5) {
      resultColor = "violet green";
    }

    const period = await PeriodModel.updateOne(
      { periodId: periodId },
      {
        $set: {
          resultColor: resultColor,
          resultNumber: resultNumber,
          price: price,
          isResultByAdmin: true,
        },
      }
    ).then((err, docs) =>
      LogService.updateLog("Admin-PeriodUpdate", err, docs)
    );
  }

  const periods = [Parity, Sapre, Bcone, Emred].filter((e) => e != null);

  for await (const period of periods) {
    await updatePeriod(period.periodId, period.resultNumber);
  }

  PeriodService.calculatePeriodResult(true);

  ResponseService.success(res, "Period Results set successfully", {
    Parity: Parity != null,
    Sapre: Sapre != null,
    Bcone: Bcone != null,
    Emred: Emred != null,
  });
};

module.exports.getBetsAmount = async (req, res) => {
  const currentSession = await SessionController.getCurrentSession();

  currentSession.sort((a, b) => a.periodId - b.periodId);
  const data = {};

  for await (const session of currentSession) {
    const name = periodNames[currentSession.indexOf(session)];
    const allBets = await betModel.find({ periodId: session.periodId });

    if (allBets.length === 0) {
      data[name] = {
        totalBets: 0,
      };
      continue;
    }

    const colors = {
      red: 0,
      green: 0,
      violet: 0,
    };
    const numbers = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };
    //Calculate total amount for all bets in the period
    for await (const bet of allBets) {
      // This means prediction is a color
      if (isNaN(bet.prediction)) {
        if (bet.prediction === "red") {
          colors.red += bet.betAmount;
        } else if (bet.prediction === "green") {
          colors.green += bet.betAmount;
        } else if (bet.prediction === "violet") {
          colors.violet += bet.betAmount;
        }
      }
      // This means prediction is a number
      else {
        numbers[bet.prediction] += bet.betAmount;
      }
    }
    data[name] = {
      totalBets: allBets.length,
      colors,
      numbers,
    };
  }

  return ResponseService.success(res, "All bets of current period", data);
};
