const Period = require("../Models/PeriodModel");
const { success, error } = require("../../common/Constants").Status;
const { periodNames: periods } = require("../../common/Constants");
const Bet = require("../Models/betModel");

const { PeriodService } = require("../services/periodService");
const { SessionController } = require("./sessionController");
const PeriodModel = require("../Models/PeriodModel");

class PeriodController {
  static createNewPeriods = async (time) => {
    console.log(`[STARTED] - ${Date(time).toString()}`);
    SessionController.currentSession = await PeriodService.createNewPeriods(
      time
    );
  };

  static calculatePeriodResult = async (time) =>
    PeriodService.calculatePeriodResult(time);

  static getAllPeriods = async () => PeriodService.getAllPeriods();

  static getCurrentSession = async (req, res) =>
    PeriodService.getCurrentSession(req, res);

  static async handlePeriod() {
    const sessions = await PeriodModel.find().limit(1)?.sort({ _id: -1 });
    // const sessions = await this.getAllPeriods();
    let hasSessionEnded;
    let startTime;

    // No previous data
    // We can simply create new Periods
    if (sessions.length === 0) {
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

    const calculateTime = startTime + (2 * 60 + 50) * 1000; // This will give startTime + 2:30 mins
    const expireTime = calculateTime + 10 * 1000; // This will give expire time - startTime + 3:00 mins

    if (hasSessionEnded) {
      this.createNewPeriods(startTime);
    }

    //This will Calculate the result of current session after 2:30 mins of start
    setTimeout(() => {
      return this.calculatePeriodResult();
    }, calculateTime - Date.now());

    // This will go to next iteration of the loop after 3 mins of start
    setTimeout(() => {
      console.log(`[ENDED] - ${Date(expireTime).toString()}`);
      return this.handlePeriod();
    }, expireTime - Date.now());
  }

  static getHistory = async (req, res) => PeriodService.getHistory(req, res);
}

// const records = async () => {
//   async function getPeriods(periodname) {
//     let data = await PeriodTimer.find({
//       periodName: periodname,
//     })
//       .sort({ _id: -1 })
//       .limit(200);
//     console.log(data.length);
//     return data;
//   }
//   let parityData = await getPeriods(periods[0]);
//   let sapreData = await getPeriods(periods[1]);
//   let bconData = await getPeriods(periods[2]);
//   let emredData = await getPeriods(periods[3]);

//   return {
//     parityData,
//     sapreData,
//     bconData,
//     emredData,
//   };
// };

// module.exports.periods = async (req, res) => {
//   const newPeriods = await records();

//   let ParityPeriod = await PeriodTimer.find({
//     periodName: periods[0],
//   });
//   ParityPeriod = ParityPeriod[ParityPeriod.length - 1];
//   let SaprePeriod = await PeriodTimer.find({
//     periodName: periods[1],
//   });
//   SaprePeriod = SaprePeriod[SaprePeriod.length - 1];
//   let BconPeriod = await PeriodTimer.find({
//     periodName: periods[2],
//   });
//   BconPeriod = BconPeriod[BconPeriod.length - 1];
//   let EmredPeriod = await PeriodTimer.find({
//     periodName: periods[3],
//   });
//   EmredPeriod = EmredPeriod[EmredPeriod.length - 1];

//   let timer = ParityPeriod.expireAt - Date.now();

//   return res.status(200).send({
//     status: success,
//     timer: timer,
//     data: {
//       Parity: {
//         currentPeriod: ParityPeriod,
//         previousResults: newPeriods.parityData,
//       },
//       Sapre: {
//         currentPeriod: SaprePeriod,
//         previousResults: newPeriods.sapreData,
//       },
//       Bcon: {
//         currentPeriod: BconPeriod,
//         previousResults: newPeriods.bconData,
//       },
//       Emred: {
//         currentPeriod: EmredPeriod,
//         previousResults: newPeriods.emredData,
//       },
//     },
//   });
// };

// module.exports.calculatePeriodResult = async (req, res) => {
//   const newPeriods = await records();

//   async function getValues(periodname, period) {
//     let bets = await Bet.find({
//       colorName: periodname,
//       period: period,
//     });
//     async function getAmount(color, numbers) {
//       let amounts = bets.filter((item) => {
//         if (
//           item.prediction === color ||
//           numbers.includes(Number(item.prediction))
//         )
//           return item;
//       });
//       let value = 0;
//       if (amounts.length > 0) {
//         for (let i = 0; i < amounts.length; i++) {
//           value += amounts[i].amount;
//         }
//       } else {
//         value = Math.min();
//       }
//       return value;
//     }
//     let redNumbers = [1, 3, 7, 9];
//     let greenNumbers = [2, 4, 6, 8];
//     let violetNumbers = [0, 5];
//     let redAmount = await getAmount("red", redNumbers);
//     let greenAmount = await getAmount("green", greenNumbers);
//     let violetAmount = await getAmount("violet", violetNumbers);
//     let amounts = [redAmount, greenAmount, violetAmount];
//     let minAmount = amounts.find(
//       (value) => value === Math.min(redAmount, greenAmount, violetAmount)
//     );
//     let colors = ["red", "green", "violet"];
//     let expectedColor =
//       minAmount === Math.min()
//         ? colors[Math.floor(Math.random() * colors.length)]
//         : colors[amounts.indexOf(minAmount)];
//     let expectedNumber = {
//       red: redNumbers,
//       green: greenNumbers,
//       violet: violetNumbers,
//     };
//     return {
//       expectedNumber,
//       expectedColor,
//     };
//   }

//   async function updatePeriod(periodname, period) {
//     let min_price = 41123;
//     let max_price = 49152;
//     const result = await getValues(periodname, period);
//     const periodResult = await Period.findOne({
//       periodName: periodname,
//       period: period,
//     });

//     let getNumber = result.expectedNumber[result.expectedColor];

//     // let number = await Period.findOne({
//     //     _id: periodResult._id
//     // })
//     // console.log("number", number);

//     // condition check
//     let newPeriod = await Period.updateOne(
//       { _id: periodResult._id },
//       {
//         price: Math.floor(
//           Math.random() * (max_price - min_price + 1) + min_price
//         ),
//         number: getNumber[Math.floor(Math.random() * getNumber.length)],
//         result: result.expectedColor,
//       }
//     );
//     return newPeriod;
//   }

//   await updatePeriod(periods[0], newPeriods.parityPeriod - 1);
//   await updatePeriod(periods[1], newPeriods.saprePeriod - 1);
//   await updatePeriod(periods[2], newPeriods.bconPeriod - 1);
//   await updatePeriod(periods[3], newPeriods.emredPeriod - 1);

//   const newParityPeriod = await Period.findOne({
//     period: newPeriods.parityPeriod - 1,
//   });
//   const newSaprePeriod = await Period.findOne({
//     period: newPeriods.saprePeriod - 1,
//   });
//   const newBconePeriod = await Period.findOne({
//     period: newPeriods.bconPeriod - 1,
//   });
//   const newEmredPeriod = await Period.findOne({
//     period: newPeriods.emredPeriod - 1,
//   });

//   res.status(200).send({
//     status: success,
//     message: "",
//     result: {
//       Parity: newParityPeriod,
//       Sapre: newSaprePeriod,
//       Bcon: newBconePeriod,
//       Emred: newEmredPeriod,
//     },
//   });
// };

module.exports.PeriodController = PeriodController;
