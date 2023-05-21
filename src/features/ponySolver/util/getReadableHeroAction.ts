import HeroAction from "../types/HeroAction";

export default function getReadableHeroAction(heroAction: HeroAction) {

    const splitAction = heroAction.toLocaleLowerCase().split('_');

    if (splitAction.length > 1)  {
        if (splitAction[0].match(/[aeiou]$/g)) splitAction[0] = splitAction[0].replace(/[aeiou]$/g, "ing");
        else splitAction[0] = splitAction[0] + 'ing';
    }

    const capitalized = splitAction.map(actionPart => actionPart.charAt(0).toUpperCase() + actionPart.slice(1)).join(" ");

    return capitalized;

}
