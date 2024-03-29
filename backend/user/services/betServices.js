const { StatusCode } = require("../../common/Constants");
const Bet = require("../Models/betModel");
const { success, error } = require("../../common/Constants").Status;
const User = require("../Models/UserModel");
const { ResponseService } = require("../../common/responseService");
const PeriodModel = require("../Models/PeriodModel");
const { SessionController } = require("../controllers/sessionController");
const WalletModel = require("../Models/walletModal");
const { UserController } = require("../controllers/userController");
const { LogService } = require("../../common/logService");
const { PeriodService } = require("./periodService");

class BetServices {
  static async getBets(req, res) {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 15;
    const userId = req.query.userId;

    const validUser = await User.findOne({ userId: userId });
    const isActive = await UserController.checkUserActive(userId);
    if (!validUser || isActive == null)
      return ResponseService.failed(res, "User not Found", StatusCode.notFound);

    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
      return;
    }

    const parityBets = await Bet.find({ userId: userId, periodName: "Parity" })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });
    const sapreBets = await Bet.find({ userId: userId, periodName: "Sapre" })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });
    const bconeBets = await Bet.find({ userId: userId, periodName: "Bcone" })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });
    const emredBets = await Bet.find({ userId: userId, periodName: "Emred" })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ _id: -1 });

    const perityCounts = await Bet.count({
      userId: userId,
      periodName: "Parity",
    });
    const sapreCounts = await Bet.count({
      userId: userId,
      periodName: "Sapre",
    });
    const bconeCounts = await Bet.count({
      userId: userId,
      periodName: "Bcone",
    });
    const emredCounts = await Bet.count({
      userId: userId,
      periodName: "Emred",
    });

    function makeResponseObject({ betModel, periodModel }) {
      if (periodModel) {
        return {
          periodName: betModel.periodName,
          periodId: betModel.periodId,
          userId: betModel.userId,
          totalAmount: betModel.totalAmount,
          betAmount: betModel.betAmount,
          resultAmount: betModel.resultAmount,
          prediction: betModel.prediction,
          didWon: betModel.didWon,
          price: periodModel.price,
          resultColor: periodModel.resultColor,
          resultNumber: periodModel.resultNumber,
          createdAt: betModel.createdAt,
        };
      } else {
        return {
          periodName: betModel.periodName,
          periodId: betModel.periodId,
          userId: betModel.userId,
          totalAmount: betModel.totalAmount,
          betAmount: betModel.betAmount,
          resultAmount: betModel.resultAmount,
          prediction: betModel.prediction,
          didWon: betModel.didWon,
        };
      }
    }

    const periodMap = {};

    async function makeResponse(allBets) {
      const bets = [];
      for (let index in allBets) {
        let period;
        const bet = allBets[index];
        if (bet.periodId in periodMap) {
          period = periodMap[bet.periodId];
        } else {
          period = await PeriodModel.findOne({ periodId: bet.periodId });
          periodMap[bet.periodId] = period;
        }
        bets.push(makeResponseObject({ betModel: bet, periodModel: period }));
      }
      return bets;
    }

    const allParityBets = await makeResponse(parityBets);
    const allSapreBets = await makeResponse(sapreBets);
    const allBconeBets = await makeResponse(bconeBets);
    const allEmredBets = await makeResponse(emredBets);

    const response = {
      parity: { totalCount: perityCounts, data: allParityBets },
      sapre: { totalCount: sapreCounts, data: allSapreBets },
      bcone: { totalCount: bconeCounts, data: allBconeBets },
      emred: { totalCount: emredCounts, data: allEmredBets },
    };

    ResponseService.success(res, `Bets Found successfully`, response);
  }

  static async makeBet(req, res) {
    const { prediction, amount, userId, periodId, periodName } = req.body;
    let isPrediction;

    if (isNaN(prediction)) {
      isPrediction = String(prediction).trim().length != 0;
    } else {
      isPrediction = Number(prediction) >= 0;
    }

    if (!isPrediction || !amount || !userId || !periodId || !periodName) {
      const errors = [];
      if (!isPrediction) errors.push("Prediction is required");
      if (!amount) errors.push("Bet Amount is required");
      if (!userId) errors.push("userId is required");
      if (!periodId) errors.push("periodId is required");
      if (!periodName) errors.push("periodName is required");

      return ResponseService.failed(res, errors, StatusCode.badRequest);
    }

    const isActive = await UserController.checkUserActive(userId);

    if (isActive == null) {
      ResponseService.failed(res, "User not Found", StatusCode.notFound);
      return;
    }
    if (!isActive) {
      ResponseService.failed(res, "User is blocked", StatusCode.unauthorized);
      return;
    }

    const wallet = await WalletModel.findOne({ userId: userId });

    if (!wallet) {
      return ResponseService.failed(
        res,
        "User wallet not found",
        StatusCode.notFound
      );
    }

    if (wallet.totalAmount < amount) {
      return ResponseService.failed(
        res,
        "Bet amount exceeds user total wallet amount",
        StatusCode.forbidden
      );
    }

    if (wallet.notAllowedAmount >= amount) {
      // This means we can easily deduct the notAllowedAmount amount from wallet
      WalletModel.updateOne(
        { userId: userId },
        {
          $set: {
            notAllowedAmount: wallet.notAllowedAmount - amount,
            totalAmount: wallet.totalAmount - amount,
          },
        }
      ).then((err, docs) =>
        LogService.updateLog("MakeBet-NotAllowed", err, docs)
      );
      // } else if (wallet.referralAmount >= amount - wallet.notAllowedAmount) {
      //   // This means we need to deduct all the notAllowedAmount amount as well some of the referralAmount from wallet
      //   WalletModel.updateOne(
      //     { userId: userId },
      //     {
      //       $set: {
      //         notAllowedAmount: 0,
      //         referralAmount:
      //           wallet.referralAmount - (amount - wallet.notAllowedAmount),
      //         totalAmount:
      //           wallet.totalAmount - (amount - wallet.notAllowedAmount),
      //       },
      //     }
      //   ).then((err, docs) => LogService.updateLog("MakeBet-Referral", err, docs));
    } else {
      // This means we need to deduct all the notAllowedAmount amount & referralAmount as well some of the withdrawableAmount from wallet
      WalletModel.updateOne(
        { userId: userId },
        {
          $set: {
            notAllowedAmount: 0,
            withdrawableAmount:
              wallet.withdrawableAmount -
              (amount - wallet.notAllowedAmount - wallet.referralAmount),
            totalAmount:
              wallet.totalAmount -
              (amount - wallet.notAllowedAmount - wallet.referralAmount),
          },
        }
      ).then((err, docs) =>
        LogService.updateLog("MakeBet-Withdrawable", err, docs)
      );
    }

    let result = await new Bet({
      prediction: prediction,
      totalAmount: amount,
      betAmount: amount * 0.95, // deducting 5% from total amount
      userId: userId,
      periodId: periodId,
      periodName: periodName,
    }).save();

    return ResponseService.success(res, "Bet placed successfully", result);
  }
}

module.exports.BetServices = BetServices;
