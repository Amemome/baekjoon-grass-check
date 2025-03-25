import { Grass } from "./fetchGrass";

export interface CountSummary {
    attendedDays: number;
    totalSolved: number;
}

function countDate(start: Date, end: Date, grass: Grass[]): CountSummary {
    let attendedDays = 0;
    let totalSolved = 0;

    const filterGrass: Grass[] = grass.filter((g: any) => start <= g.date && g.date <= end);

    filterGrass.forEach((g: Grass) => {
        attendedDays++;
        totalSolved += g.value;
    })

    return { attendedDays, totalSolved };
}

export default countDate