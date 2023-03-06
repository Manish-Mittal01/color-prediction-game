const { LogService } = require("../../common/logService");
const walletModal = require("../Models/walletModal");

class WalletService {
  static async createWallet(userId) {
    const wallet = await walletModal({ userId: userId }).save();
  }

  static async updateWalletWinningAmount({ userId, amount }) {
    const wallet = await walletModal.findOne({ userId: userId });

    const withdrawableAmount = wallet.withdrawableAmount + amount;
    const totalAmount = wallet.totalAmount + amount;

    await walletModal.updateOne(
      { userId: userId },
      {
        $set: {
          totalAmount: totalAmount,
          withdrawableAmount: withdrawableAmount,
        },
      },
    ).then((err, docs) => LogService.updateLog("WinningWallet", err, docs));
  }
}

module.exports.WalletService = WalletService;
