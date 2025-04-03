import { WEIGHT_FUNCTION } from "../config/config";
import { CountSummary } from "../countDate";

export type dayAcc = {
    name: string;
    acc: number;
}

class Lotto {
    private static instance: Lotto | null = null;
    private summaryMap: Map<string, CountSummary>;
    private dayAccArray: dayAcc[];
    private EndofRange: number;
    private excludedNames: Set<string>;

    private constructor(summaryMap: Map<string, CountSummary>) {
        this.summaryMap = summaryMap;
        this.dayAccArray = [];
        this.EndofRange = 0;
        this.excludedNames = new Set();
        this.initAccArray();
    }

    public static getInstance(summaryMap?: Map<string, CountSummary>): Lotto {
        if(!Lotto.instance) {
            if(!summaryMap) {
                throw new Error("Lotto instance 를 생성할 때는 summaryMap 이 필요합니다.");
            }
            Lotto.instance = new Lotto(summaryMap);
        }
        return Lotto.instance;
    }

    initAccArray(): void {
        const dayAccArray: dayAcc[] =  [];
        let acc = 0;

        // 각 사람이 푼 일수에 가중치함수를 적용하여 누적합 배열 생성. (] 구간을 를 의도함.
        for(const [name, summary] of this.summaryMap) {
            if(this.excludedNames.has(name)) {
                continue;
            }

            const weight = WEIGHT_FUNCTION(summary.attendedDays); //가중치 함수 적용
            if(weight < 1) {
                continue;
            }

            acc += weight;
            dayAccArray.push({name: name, acc: acc});
        }
        this.dayAccArray = dayAccArray;
        this.EndofRange = dayAccArray[dayAccArray.length-1].acc;
    }

    // 뽑는 함수. 일단 랜덤value 찾고 이탐 돌리면 됨.
    draw(): string {
        const targetValue = Math.random() * this.EndofRange;
        let low = -1;
        let high = this.dayAccArray.length;

        // 왼쪽 열린구간, 오른쪽 닫힌구간을 의도함.
        while(low + 1 < high) {
            const mid = Math.floor((low + high) / 2);
            if(this.dayAccArray[mid].acc >= targetValue) {
                high = mid;
            } else {
                low = mid;
            }
        }

        return this.dayAccArray[high].name;
    }

    exclude(name: string): void {
        this.excludedNames.add(name);
        this.initAccArray();
    }

    
}

export default Lotto;