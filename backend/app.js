const express = require("express");
const userRouter = require("./user/routers/userRouter");
const periodRouter = require("./user/routers/periodRouter");
const betRouter = require("./user/routers/betRouter");
const adminRouter = require("./admin/routers/adminRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/period", periodRouter);
app.use("/api/bet", betRouter);
app.use("/api/admin", adminRouter);

module.exports = app;
