const { WalletService } = require("../services/walletService");

class WalletController {
  static createWallet = async (userId) => WalletService.createWallet(userId);

  static updateWalletWinningAmount = async ({ userId, amount }) =>
    WalletService.updateWalletWinningAmount({ userId: userId, amount: amount });
}

module.exports.WalletController = WalletController;
