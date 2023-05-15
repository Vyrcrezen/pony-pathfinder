import serverAddress from "../../../global/serverAddress";
import ApproveHeroTurnResponse from "../types/ApproveHeroTurnResponse";
import HeroAction from "../types/HeroAction";

export default async function postApproveHeroTurn(token: string, action: HeroAction, heroId: number) {
    try {
        const result = await fetch(`${serverAddress.address}/playGameApi/v1/play/approveHeroTurn`, {
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

        return data as ApproveHeroTurnResponse;
    }
    catch (err) {
        console.log(err);
    }
}
