export default interface MapResource {
    message: string;
    mapId: number;
    compressedObstacles: {
        coordinateMap: {
            [prop: string]: number[];
        };
    };
}
