import FloodFillArguments from "../../types/FloodFillArguments";
import HeatMapJob from "../../types/HeatMapJob";
import vyFloodFill from "../../util/vyFloodFill";

self.onmessage = function(event: MessageEvent<{ floodFillArguments: FloodFillArguments, jobId: number}>) {
    const { floodFillArguments, jobId } = event.data;
    const heatMap = vyFloodFill(floodFillArguments);

    self.postMessage({ jobId, heatMap} as HeatMapJob);
}
