import Coordinate from "./Coordinate";

export default interface Treasure {
    id: number;
    position: Coordinate;
    name: string;
    collectedByHeroId: null | number;
}
