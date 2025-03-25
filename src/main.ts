
import gradient from "gradient-string";
import { rainbow } from "gradient-string";
import { PARTICIPANTS } from "./config/participants";
import countDate, { CountSummary } from "./countDate";
import fetchGrass from "./fetchGrass";
import ora from "ora";
import Table from "cli-table3";
import inquirer from "inquirer";
import { grassGradient, kingGradient, randomGradient } from "./config/gradients";
import { waitForEnter } from "./util/waitForEnter";
import { FROM_DATE, TO_DATE } from "./config/config";


const summaryMap = new Map<string, CountSummary>();

async function FetchData() {
    console.log(grassGradient("🌱 잔디 데이터를 불러옵니다!"));
    for (const handle of PARTICIPANTS) {
        try {
            const grass = await fetchGrass(handle);
            const summary:CountSummary = countDate(FROM_DATE, TO_DATE, grass);
            summaryMap.set(handle, summary);
            console.log(randomGradient()(`${handle} ${summary.attendedDays} ${summary.totalSolved} ok 👌`));

        } catch (error) {
            console.log(error + ` HANDLE : ${handle}`);
        }
    }
}

async function PrizeForTop() {
    const sorted = [...summaryMap].sort((a, b) => {
        if(b[1].attendedDays == a[1].attendedDays) {
            return b[1].totalSolved - a[1].totalSolved;
        } else {
            return b[1].attendedDays - a[1].attendedDays;
        }});
    console.log(rainbow("🏆 최고의 선수 🏆 를 축하합니다!"));
    
    const table = new Table({
        head: ['이름', '출석일수'],
        colWidths: [20, 10],
    })

    const [first, ...rest] = sorted;
    table.push([kingGradient(`🥇 ${first[0]}`), first[1].attendedDays]);

    rest.forEach(([handle, summary]) => {
        table.push([handle, summary.attendedDays]);
    })

    console.log(table.toString());
    
    await waitForEnter(); 

    console.log("1등상은..." +kingGradient(first[0]) + "님 입니다!!");
    console.log(rainbow("🎉🎉🎉 축하합니다! 🎉🎉🎉"));
}

async function DrawLotto() {
    console.log("DRQW");
}

async function mainMenu() {
    const { selected } = await inquirer.prompt({
        type: "list",
        name: "selected",
        message: "옵션을 선택해주세요!",
        choices: [
            { name: "☘️ 잔디 데이터 불러오기", value: "fetch" },
            { name: "🎲 추첨 시작하기", value: "draw" },
            { name: "🏆 상위 1명 선정하기!!", value: "prize" },
            { name: "❌ 종료하기", value: "exit" }
        ]
    })

    switch (selected) {
        case "fetch":
            await FetchData();
            mainMenu();
            break;
        case "draw":
            await DrawLotto();
            mainMenu();
            break;
        case "prize":
            await PrizeForTop();
            mainMenu();
            break;
        case "exit":
            break;
    }
}

mainMenu();
