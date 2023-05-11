import serverAddress from "../../../global/serverAddress";
import HeroAction from "../types/HeroAction";
import MapResource from "../types/MapResource";

export default async function postApproveHeroTurn(token: string, action: HeroAction, heroId: number) {
    try {
        const result = await fetch(`${serverAddress.address}/playGameApi/v1/play/mapResource`, {
            method: 'POST',
            headers: {
                "story-playthrough-token": token,
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify({
                action,
                heroId
            })
        });
    
        const data = await result.json();
        console.log(data);

        return data as MapResource;
    }
    catch (err) {
        console.log(err);
    }
}
