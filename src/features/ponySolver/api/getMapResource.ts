import serverAddress from "../../../global/serverAddress";
import MapResource from "../types/MapResource";

export default async function getMapResource(token: string) {
    try {
        const response = await fetch(`${serverAddress.address}/playGameApi/v1/play/mapResource`, {
            method: 'GET',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
        });
    
        const data = await response.json();

        return data as MapResource;
    }
    catch (err) {
        console.log(err);
    }
}
