const UserModel = require("../../user/Models/UserModel");
const { success, error } = require("../../common/Constants");
const transactionModel = require("../../user/Models/transactionModel");
const {
  TransactionType,
  TransactionStatus,
} = require("../../common/Constants");

module.exports.newRecords = async (req, res) => {
  const allUsers = await UserModel.find();
  let date = new Date();

  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const newUsers = await UserModel.find({
    createdAt: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
  });

  const allDeposits = await transactionModel.find({
    transactionType: TransactionType.deposit,
    status: TransactionStatus.approved,
  });
  const newDeposits = await transactionModel.find({
    transactionType: TransactionType.deposit,
    status: TransactionStatus.approved,
    createdAt: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
  });

  let totalDepositAmount = 0;
  allDeposits.map((item) => {
    totalDepositAmount += Number(item.amount);
  });

  let todayDeposits = 0;
  newDeposits.map((item) => {
    todayDeposits += item.amount;
  });

  const allWithdrawn = await transactionModel.find({
    transactionType: TransactionType.withdraw,
    status: TransactionStatus.approved,
  });
  const newWithdraw = await transactionModel.find({
    transactionType: TransactionType.withdraw,
    status: TransactionStatus.approved,
    createdAt: {
      $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    },
  });

  let totalWithrawnAmount = 0;
  allWithdrawn.map((item) => {
    totalWithrawnAmount += item.amount;
  });
  let todayWithdrawn = 0;
  newWithdraw.map((item) => {
    todayWithdrawn += item.amount;
  });

  res.status(200).send({
    status: success,
    message: "data fetched successfully",
    data: {
      users: { newUsers: newUsers.length, totalUsers: allUsers.length },
      deposits: {
        newDeposits: todayDeposits,
        totalDeposits: totalDepositAmount,
      },
      withdraw: {
        newWithdraw: todayWithdrawn,
        totalWithrawn: totalWithrawnAmount,
      },
      profit: {
        todayProfit: todayDeposits - todayWithdrawn,
        totalProfit: totalDepositAmount - totalWithrawnAmount,
      },
    },
  });
};
