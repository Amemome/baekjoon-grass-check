
export type Grass = {
    date: Date;
    value: number;
}

async function fetchGrass(username: string): Promise<Grass[]> {
    try {
        const response = await fetch(`https://solved.ac/api/v3/user/grass?handle=${username}&topic=default`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if(!response.ok) {
            throw new Error("응답 실패");
        }

        const data = await response.json();
        const grass: Grass[] = data.grass
            .filter((g: any) => typeof g.value === "number")
            .map((g: any) => ({
                date: new Date(g.date),
                value: g.value,
        }));
        
        return grass;
    } catch (error) {
        throw new Error("잔디 정보를 가져오는데 에러가 발생했어요.");
    }
}


export default fetchGrass;