import serverAddress from "../../../global/serverAddress";
import ResetLevel from "../types/ResetLevel";

export default async function postResetLevel(token: string) {
    try {
        const result = await fetch(`${serverAddress.address}/playGameApi/v1/story/resetLevel`, {
            method: 'POST',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
            body: "{}"
        });
    
        const data = await result.json();

        return data as ResetLevel;
    }
    catch (err) {
        console.log(err);
    }
}
