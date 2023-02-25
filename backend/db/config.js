const mongoose = require("mongoose");
require("dotenv/config");
const app = require('../app');
const periodTimer = require("../user/controllers/periodTimerController");

mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    err => {
        if (err) console.log(err, "Connection failed");
        console.log('Connected to mongodb')
    }
);


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app is running on ${port}`);
    periodTimer();
});
