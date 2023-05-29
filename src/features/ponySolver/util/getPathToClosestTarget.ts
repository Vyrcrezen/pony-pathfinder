import Graph from "node-dijkstra";
import Path from "../types/Path";

export default function getPathToClosestTarget( graphMap: {[prop: string]: { [prop: string]: number }}, graphStart: string, graphTargets: string[]) {

    const targetWithPath: Path[] = [];
    const graph = new Graph(JSON.parse(JSON.stringify(graphMap)));

    graphTargets.forEach(target => {
        let path = graph.path(graphStart, target, { cost: true });
        if (Array.isArray(path)) path = {path: path, cost: path.length};
        targetWithPath.push({cost: path.cost, graphPath: path.path, target: target, coordinatePath: [], heroId: -1});
    });

    let pathToClosestTarget: Path = targetWithPath[0];
    for (const target of targetWithPath) {
        if (pathToClosestTarget.cost > target.cost) pathToClosestTarget = target;
    }

    // Adding Coordinate path
    pathToClosestTarget.graphPath.forEach(graphPathItem => {
        const coordinates = graphPathItem.split('-').map(item => +item);
        pathToClosestTarget.coordinatePath.push({ x: coordinates[0], y: coordinates[1] })
    })

    return pathToClosestTarget;
}
