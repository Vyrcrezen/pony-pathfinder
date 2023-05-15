import serverAddress from "../../../global/serverAddress";
import MapState from "../types/MapState";
import NextLevel from "../types/NextLevel";

export default async function postNextLevel(token: string) {
    try {
        const result = await fetch(`${serverAddress.address}/playGameApi/v1/story/nextLevel`, {
            method: 'POST',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
            body: "{}"
        });
    
        const data = await result.json();

        return data as NextLevel;
    }
    catch (err) {
        console.log(err);
    }
}
