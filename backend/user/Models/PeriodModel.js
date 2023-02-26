const { Schema, model } = require("mongoose");

const periodSchema = Schema(
  {
    periodName: {
      type: String,
    },
    periodId: {
      type: Number,
    },
    startTime: {
      type: Number,
    },
    expiredAt: {
      type: Number,
    },
    isResultByAdmin: {
      type: Boolean,
      default: false,
    },
    resultNumber: {
      type: Number,
      default: null,
    },
    resultColor: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("periods", periodSchema);
