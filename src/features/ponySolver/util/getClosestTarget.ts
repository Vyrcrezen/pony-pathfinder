import Graph from "node-dijkstra";

export default function getClosestTarget( graphMap: {[prop: string]: { [prop: string]: number }}, start: string, targets: string[]) {

    const targetWithPath: { target: string, path: string[], cost: number }[] = [];
    const graph = new Graph(graphMap);

    targets.forEach(target => {
        let path = graph.path(start, target, { cost: true });
        if (Array.isArray(path)) path = {path: path, cost: path.length};
        targetWithPath.push({...path, target: target});
    });

    let closestTarget: { target: string, path: string[], cost: number } = targetWithPath[0];
    for (const target of targetWithPath) {
        console.log('Path with cost:');
        console.log(target);
        // if (!closestTarget) closestTarget = target;
        if (closestTarget.cost > target.cost) closestTarget = target;
    }

    return closestTarget.path;
}
