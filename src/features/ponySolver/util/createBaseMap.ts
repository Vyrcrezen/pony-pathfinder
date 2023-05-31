import MapEntities from "../types/MapEntities";

export default function createBaseMap({width, height, obstacles}: { width: number, height: number, obstacles: {[props: string]: number[]} }): number[][] {

    try {
        const obstacleMap = Array.from({ length: height }, () => new Array(width).fill(0));
    
        Object.keys(obstacles).forEach(x => {

            obstacles[x].forEach(y => {

                obstacleMap[+x][y] = MapEntities.OBSTACLE;
            })
        });

        return obstacleMap;
    }
    catch(err) {
        console.error('Error while generating the obstacle map:');
        throw err;
    }   
}
