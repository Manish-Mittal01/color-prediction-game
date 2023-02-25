const express = require("express");
const userRouter = require('./user/routers/userRouter');
const adminRouter = require("./admin/routers/adminRouter");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);


module.exports = app;
