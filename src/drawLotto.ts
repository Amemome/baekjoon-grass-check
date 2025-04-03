import { fireGradient, grassGradient, oceanGradient, purpleHazeGradient } from "./config/gradients";
import { CountSummary } from "./countDate";
import getUserInput from "./util/getUserInput";
import Lotto from "./util/Lotto";
import inquirer from 'inquirer';

async function drawLotto(summaryMap: Map<string, CountSummary>) {

    const lotto = Lotto.getInstance(summaryMap);

    const LOTTO_NUMBER: number = Number(await getUserInput("추첨할 인원을 입력해주세요! "));

    const winners: string[] = new Array<string>(LOTTO_NUMBER);

    for(let loop = 0; loop < LOTTO_NUMBER; loop++) {
        const { selected } = await inquirer.prompt({
            type: "list",
            name: "selected",
            message: "다음 추첨자를 뽑으세요! 남은인원: "+ (LOTTO_NUMBER-loop),
            choices: [
                { name: "🗳️ 추첨", value: "next" },
                { name: "🔙 뒤로가기", value: "exit" },
            ]
        })

        if(selected == "exit") {
            break;
        }

        
        const winner: string = lotto.draw();
        winners[loop] = winner;
        lotto.exclude(winner);
        console.log(fireGradient("추첨 결과는..."));
        console.log(purpleHazeGradient(winner)+oceanGradient("님 입니다! 축하드립니다!"));

    }

    console.log("최종 당첨자는 " + grassGradient(winners.toString()) + " 입니다!");

} 



export default drawLotto;