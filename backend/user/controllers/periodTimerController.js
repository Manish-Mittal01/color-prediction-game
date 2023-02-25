const PeriodTimer = require("../Models/periodTimerModel");
const { periods } = require('../common/Constants');

function updatePeriod(periodname, periodId, time) {
    return {
        periodName: periodname,
        period: periodId,
        startTime: time,
        expireAt: time + 3 * 60 * 1000,
    };
};

const records = async () => {
    async function getPeriods(periodname) {
        let data = await PeriodTimer.find({
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

async function periodTimer() {
    const newPeriods = await records();
    let time = Date.now();
    let expireTime = time + (3 * 60 * 1000);
    // let expireTime = time + (3 * 1000);

    const newPeriod1 = await new PeriodTimer(updatePeriod(periods[0], newPeriods.parityPeriod, time));
    let result1 = await newPeriod1.save();
    const newPeriod2 = await new PeriodTimer(updatePeriod(periods[1], newPeriods.saprePeriod, time));
    let result2 = await newPeriod2.save();
    const newPeriod3 = await new PeriodTimer(updatePeriod(periods[2], newPeriods.bconPeriod, time));
    let result3 = await newPeriod3.save();
    const newPeriod4 = await new PeriodTimer(updatePeriod(periods[3], newPeriods.emredPeriod, time));
    let result4 = await newPeriod4.save();

    setTimeout(() => {
        return periodTimer();
    }, expireTime - Date.now());

}

module.exports = periodTimer;