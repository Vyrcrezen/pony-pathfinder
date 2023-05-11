
export default async function postBeginStory(token: string) {
    const result = await fetch('https://ponypanic.io/playGameApi/v1/story/begin', {
        method: 'POST',
        headers: {
            "player-token": token
        },
        mode: 'cors'
    });

    console.log(result);
}
