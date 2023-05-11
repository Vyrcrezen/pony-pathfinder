import serverAddress from "../../../global/serverAddress";
import MapState from "../types/MapState";

export default async function getMapState(token: string) {
    try {
        const result = await fetch(`${serverAddress.address}/playGameApi/v1/play/mapState`, {
            method: 'GET',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
        });
    
        const data = await result.json();
        console.log(data);

        return data as MapState;
    }
    catch (err) {
        console.log(err);
    }
}
