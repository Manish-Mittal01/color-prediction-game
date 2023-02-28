const { Schema, model } = require("mongoose");

const referralModel = Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    level1: {
      type: [
        {
          referrarId: { type: String, required: true },
          amount: { type: Number, required: true },
        },
      ],
      default: [],
    },
    level2: {
      type: [
        {
          referrarId: { type: String, required: true },
          amount: { type: Number, required: true },
        },
      ],
      default: [],
    },
    level3: {
      type: [
        {
          referrarId: { type: String, default: 0 },
          amount: { type: Number, default: 0 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = model("referrals", referralModel);
