import serverAddress from "../../../global/serverAddress";
import MapResource from "../types/MapResource";
import PlaythroughState from "../types/PlaythroughState";

export default async function getPlaythroughState(token: string) {
    try {
        const response = await fetch(`${serverAddress.address}/playGameApi/v1/story/playthroughState`, {
            method: 'GET',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
        });
    
        const data = await response.json();

        return data as PlaythroughState;
    }
    catch (err) {
        console.log(err);
    }
}
