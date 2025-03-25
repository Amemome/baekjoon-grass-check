import { PARTICIPANTS } from "../lib/participants";
import countDate, { CountSummary } from "./countDate";
import fetchGrass from "./fetchGrass";

const FROM_DATE = new Date("2024-01-01");
const TO_DATE = new Date("2024-05-05");

async function main () {

    const summaryMap = new Map<string, CountSummary>();


    for (const handle of PARTICIPANTS) {
        try {
            const grass = await fetchGrass(handle);
            const summary:CountSummary = countDate(FROM_DATE, TO_DATE, grass);
            summaryMap.set(handle, summary);
            console.log(`${handle} ${summary.attendedDays} ${summary.totalSolved} ok.`);

        } catch (error) {
            console.log(error + ` HANDLE : ${handle}`);
        }
    }
    console.log(summaryMap);
}


main();