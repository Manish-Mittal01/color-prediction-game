const { WalletService } = require("../services/walletService");

class WalletController {
  static updateWalletWinningAmount = async ({ userId, amount }) =>
    WalletService.updateWalletWinningAmount({ userId: userId, amount: amount });
}

module.exports.WalletController = WalletController;
