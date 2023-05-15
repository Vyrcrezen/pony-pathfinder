import Graph from "node-dijkstra";

export default function getClosestTarget( graphMap: {[prop: string]: { [prop: string]: number }}, start: string, targets: string[]) {

    const targetWithPath: { target: string, path: string[] }[] = [];
    const graph = new Graph(graphMap);

    targets.forEach(target => {
        let path = graph.path(start, target);
        if (!Array.isArray(path)) path = path.path;
        targetWithPath.push({ target, path });
    });

    let closestTarget;
    for (const target of targetWithPath) {
        if (!closestTarget) closestTarget = target.path;
        else if (closestTarget.length > target.path.length) closestTarget = target.path;
    }

    return closestTarget;
}
