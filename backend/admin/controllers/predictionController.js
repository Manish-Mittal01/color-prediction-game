const betModel = require("../../user/Models/betModel");
const PeriodModel = require("../../user/Models/PeriodModel");
const { ColorNumbers, periodNames } = require("../common/Constants");

const { success, error } = require("../../common/Constants").Status;

module.exports.prediction = async (req, res) => {
    const { periodId, resultNumber } = req.body;

    async function updatePeriod() {
        const minPrice = 41123;
        const maxPrice = 49152;
        const price = Math.floor(
            Math.random() * (maxPrice - minPrice + 1) + minPrice
        );

        let resultColor = "";
        if (ColorNumbers.red.includes(Number(resultNumber))) {
            resultColor = "red"
        }
        else if (ColorNumbers.green.includes(Number(resultNumber))) {
            resultColor = "green"
        }
        else if (resultNumber == 0) {
            resultColor = "violet red"
        }
        else if (resultNumber == 5) {
            resultColor = "violet green"
        }

        const period = await PeriodModel.updateOne(
            { periodId: periodId },
            {
                $set: {
                    resultColor: resultColor,
                    resultNumber: resultNumber,
                    price: price,
                    isResultByAdmin: true
                },
            }
        );
    }

    await updatePeriod();

    const currentUpdatedPeriod = await PeriodModel.findOne({
        periodId: periodId
    });

    res.status(200).send({
        status: success,
        message: "prediction set successfully",
        period: currentUpdatedPeriod
    })
}

module.exports.getBetsAmount = async (req, res) => {
    const { periodId } = req.body;

    let ParityBets = await betModel.find({
        periodId: periodId,
        periodName: periodNames[0]
    })
    let SapreBets = await betModel.find({
        periodId: periodId,
        periodName: periodNames[1]
    })
    let BconeBets = await betModel.find({
        periodId: periodId,
        periodName: periodNames[2]
    })
    let EmredBets = await betModel.find({
        periodId: periodId,
        periodName: periodNames[3]
    })



    res.status(200).send({
        status: success,
        message: "bet amounts found",
        data: {
            ParityBets, SapreBets, BconeBets, EmredBets
        }
    })
}