
import { rainbow } from "gradient-string";
import { PARTICIPANTS } from "./config/participants";
import countDate, { CountSummary } from "./countDate";
import fetchGrass from "./fetchGrass";
import Table from "cli-table3";
import inquirer from "inquirer";
import { grassGradient, kingGradient, randomGradient } from "./config/gradients";
import { FROM_DATE, TO_DATE } from "./config/config";
import Lotto from "./util/Lotto";
import drawLotto from "./drawLotto";
import getUserInput from "./util/getUserInput";


const summaryMap = new Map<string, CountSummary>();

async function FetchData() {
    console.log(grassGradient("🌱 잔디 데이터를 불러옵니다!"));
    for (const handle of PARTICIPANTS) {
        try {
            const grass = await fetchGrass(handle);
            const summary: CountSummary = countDate(FROM_DATE, TO_DATE, grass);
            summaryMap.set(handle, summary);
            console.log(randomGradient()(`${handle} ${summary.attendedDays} ${summary.totalSolved} ok 👌`));

        } catch (error) {
            console.log(error + ` HANDLE : ${handle}`);
        }
    }

    Lotto.getInstance(summaryMap);
}

async function PrizeForTop() {
    const sorted = [...summaryMap].sort((a, b) => {
        if(b[1].attendedDays == a[1].attendedDays) {
            return b[1].totalSolved - a[1].totalSolved;
        } else {
            return b[1].attendedDays - a[1].attendedDays;
        }});
    console.log(rainbow("🏆 최고의 선수 🏆를 축하합니다!"));
    
    const table = new Table({
        head: ['이름', '출석일수', '푼 문제 수'],
        colWidths: [40, 20, 20],
    })

    const [first, ...rest] = sorted;
    table.push([kingGradient(`🥇 ${first[0]}`), first[1].attendedDays, first[1].totalSolved]);

    rest.forEach(([handle, summary]) => {
        table.push([handle, summary.attendedDays, summary.totalSolved]);
    })

    console.log(table.toString());

    console.log("1등상은..." + kingGradient(first[0]) + "님 입니다!!");
    console.log(rainbow("🎉🎉🎉 축하합니다! 🎉🎉🎉"));
}

async function DrawLotto() {
    await drawLotto(summaryMap);
}

async function ExcludeName() {


    const nickname = (await getUserInput("제외할 이름을 입력해주세요! ")).trim();
    
    const lotto = Lotto.getInstance();
    lotto.exclude(nickname);
    
}

async function mainMenu() {
    console.log();
    const { selected } = await inquirer.prompt({
        type: "list",
        name: "selected",
        message: "옵션을 선택해주세요!",
        choices: [
            { name: "☘️ 잔디 데이터 불러오기", value: "fetch" },
            { name: "🎲 추첨 시작하기", value: "draw" },
            { name: "🙂‍↔️ 추첨에서 제외하기", value: "exclude" },
            { name: "🏆 상위 1명 선정하기!!", value: "prize" },
            { name: "❌ 종료하기", value: "exit" },
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
        case "exclude":
            await ExcludeName();
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
