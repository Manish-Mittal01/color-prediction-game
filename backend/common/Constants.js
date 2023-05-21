module.exports.Status = {
  success: true,
  error: false,
};

module.exports.periodNames = ["Parity", "Sapre", "Bcone", "Emred"];

module.exports.ReferralBonus = {
  level1: 0.3,
  level2: 0.05,
  level3: 0.0,
};

module.exports.periodStarts = [1001, 2001, 3001, 4001];

module.exports.StatusCode = {
  success: 200,
  created: 201,
  accepted: 202,
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  timeout: 408,
};

module.exports.ColorNumbers = {
  green: [1, 3, 7, 9],
  red: [2, 4, 6, 8],
  violet: [0, 5],
};

module.exports.TransactionType = {
  deposit: "deposit",
  withdraw: "withdraw",
};

module.exports.TransactionStatus = {
  pending: "pending",
  approved: "approved",
  rejected: "rejected",
};
