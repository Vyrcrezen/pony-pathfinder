import HeroAction from "../types/HeroAction";

/**
 * 
 * @param heroAction A string which refers to an action the hero caan take. The acceptable values are described in the `HeroAction` `type`
 * @returns A string, where the first letters are capitalized, and the verb is put into the continuous present form.
 */
export default function getReadableHeroAction(heroAction: HeroAction) {

    const splitAction = heroAction.toLocaleLowerCase().split('_');

    // If the initial string was MOVE_DOWN for example, turn MOVE to MOVing
    if (splitAction.length > 1)  {
        // If the last letter is a vowel, replace the vowel with 'ing'
        if (splitAction[0].match(/[aeiou]$/g)) splitAction[0] = splitAction[0].replace(/[aeiou]$/g, "ing");
        // Otherwise, just add 'ing' to the end
        else splitAction[0] = splitAction[0] + 'ing';
    }

    // Capitalize the first letter, and return it with the rest of the letters, then join them
    const capitalized = splitAction.map(actionPart => actionPart.charAt(0).toUpperCase() + actionPart.slice(1)).join(" ");

    return capitalized;

}
