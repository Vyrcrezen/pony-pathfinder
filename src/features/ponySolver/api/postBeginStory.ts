import serverAddress from "../../../global/serverAddress";

export default async function postBeginStory(token: string) {
    const result = await fetch(`${serverAddress.address}/playGameApi/v1/story/begin`, {
        method: 'POST',
        headers: {
            "player-token": token
        },
        mode: 'cors'
    });

    console.log(result);
}
