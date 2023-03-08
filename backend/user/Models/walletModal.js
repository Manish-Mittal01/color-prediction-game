const { Schema, model } = require("mongoose");
const shortid = require("shortid");

const walletSchema = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    walletId: {
      type: String,
      default: shortid.generate(),
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    withdrawableAmount: {
      type: Number,
      default: 0,
    },
    referralAmount: {
      type: Number,
      default: 0,
    },
    bonusAmount: {
      type: Number,
      default: 0,
    },
    notAllowedAmount: {
      type: Number,
      default: 0,
    },
    isFirstDeposit: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("wallets", walletSchema);
