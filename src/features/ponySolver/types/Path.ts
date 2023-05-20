import Coordinate from "./Coordinate";

export default interface Path {
    target: string;
    graphPath: string[];
    cost: number;
    coordinatePath: Coordinate[];
    heroId: number;
}
