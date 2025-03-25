
async function fetchGrass(username: string) {
    const response = await fetch(`https://solved.ac/api/v3/user/grass?handle=${username}&topic=default`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    if(!response.ok) {
        return;
    }

    const data = await response.json();
    return data;
}