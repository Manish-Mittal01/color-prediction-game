const Period = require("../Models/PeriodModel");
const { success, error } = require('../common/Constants').status;
const { periods } = require('../common/Constants');
const Bet = require("../Models/betModel");

const records = async () => {
    async function getPeriods(periodname) {
        let data = await Period.find({
            periodName: periodname
        });
        return data;
    };
    let parityData = await getPeriods(periods[0]);
    let sapreData = await getPeriods(periods[1]);
    let bconData = await getPeriods(periods[2]);
    let emredData = await getPeriods(periods[3]);
    let parityPeriod = parityData[parityData.length - 1].period + 1;
    let saprePeriod = sapreData[sapreData.length - 1].period + 1;
    let bconPeriod = bconData[bconData.length - 1].period + 1;
    let emredPeriod = emredData[emredData.length - 1].period + 1;

    return {
        parityData,
        sapreData,
        bconData,
        emredData,
        parityPeriod,
        saprePeriod,
        bconPeriod,
        emredPeriod
    }
}

module.exports.periods = async (req, res) => {
    const newPeriods = await records();

    function updatePeriod(periodname, peroid) {
        return {
            periodName: periodname,
            period: peroid
        };
    };
    const newPeriod1 = await new Period(updatePeriod(periods[0], newPeriods.parityPeriod));
    let result1 = await newPeriod1.save();
    const newPeriod2 = await new Period(updatePeriod(periods[1], newPeriods.saprePeriod));
    let result2 = await newPeriod2.save();
    const newPeriod3 = await new Period(updatePeriod(periods[2], newPeriods.bconPeriod));
    let result3 = await newPeriod3.save();
    const newPeriod4 = await new Period(updatePeriod(periods[3], newPeriods.emredPeriod));
    let result4 = await newPeriod4.save();


    return res.status(200).send({
        status: success,
        data: {
            Parity: {
                currentPeriod: newPeriods.parityPeriod,
                previousResults: newPeriods.parityData
            },
            Sapre: {
                currentPeriod: newPeriods.saprePeriod,
                previousResults: newPeriods.sapreData
            },
            Bcon: {
                currentPeriod: newPeriods.bconPeriod,
                previousResults: newPeriods.bconData
            },
            Emred: {
                currentPeriod: newPeriods.emredPeriod,
                previousResults: newPeriods.emredData
            },
        },
    })
}


module.exports.periodResult = async (req, res) => {
    const newPeriods = await records();

    async function getValues(periodname, period) {
        let bets = await Bet.find({
            colorName: periodname,
            period: period
        });
        async function getAmount(color, numbers) {
            let amounts = bets.filter(item => {
                if (item.prediction === color || numbers.includes(Number(item.prediction))) return item
            });
            let value = 0;
            if (amounts.length > 0) {
                for (let i = 0; i < amounts.length; i++) {
                    value += amounts[i].amount;
                }
            }
            else {
                value = Math.min();
            }
            return value;
        }
        let redNumbers = [1, 3, 7, 9];
        let greenNumbers = [2, 4, 6, 8];
        let purpleNumbers = [0, 5];
        let redAmount = await getAmount("red", redNumbers)
        let greenAmount = await getAmount("green", greenNumbers)
        let purpleAmount = await getAmount("purple", purpleNumbers)
        let amounts = [redAmount, greenAmount, purpleAmount];
        let minAmount = amounts.find(value => value === Math.min(redAmount, greenAmount, purpleAmount));
        let colors = ["red", "green", "purple"];
        let expectedColor = minAmount === Math.min() ? colors[Math.floor(Math.random() * colors.length)] : colors[amounts.indexOf(minAmount)];
        let expectedNumber = {
            red: redNumbers,
            green: greenNumbers,
            purple: purpleNumbers
        }
        return {
            expectedNumber, expectedColor
        }
    }

    async function updatePeriod(periodname, period) {
        let min_price = 41123;
        let max_price = 49152;
        const result = await getValues(periodname, period)
        const periodResult = await Period.findOne({
            periodName: periodname,
            period: period
        });

        let getNumber = result.expectedNumber[result.expectedColor];
        let newPeriod = await Period.updateOne(
            { _id: periodResult._id },
            {
                price: Math.floor(Math.random() * (max_price - min_price + 1) + min_price),
                number: getNumber[Math.floor(Math.random() * getNumber.length)],
                result: result.expectedColor,
            },
        )
        return newPeriod;
    };

    await updatePeriod(periods[0], newPeriods.parityPeriod - 1);
    await updatePeriod(periods[1], newPeriods.saprePeriod - 1);
    await updatePeriod(periods[2], newPeriods.bconPeriod - 1);
    await updatePeriod(periods[3], newPeriods.emredPeriod - 1);

    const newParityPeriod = await Period.findOne({
        period: newPeriods.parityPeriod - 1
    });
    const newSaprePeriod = await Period.findOne({
        period: newPeriods.saprePeriod - 1
    });
    const newBconePeriod = await Period.findOne({
        period: newPeriods.bconPeriod - 1
    });
    const newEmredPeriod = await Period.findOne({
        period: newPeriods.emredPeriod - 1
    });


    res.status(200).send({
        status: success,
        message: "",
        result: {
            Parity: newParityPeriod,
            Sapre: newSaprePeriod,
            Bcon: newBconePeriod,
            Emred: newEmredPeriod
        }
    })
}