
export default class VyFloodFillManager {
    private static workers: Worker[] = [];

    private static initializeWorkers(count: number) {
        VyFloodFillManager.workers.forEach(worker => worker.terminate());

        VyFloodFillManager.workers = [];

        for (let i = 0; i < count; i++) {
            VyFloodFillManager.workers.push(new Worker(new URL('./vyFloodFill.worker.ts', import.meta.url)));
        }
    }

    static getWorkers(count: number) {
        if (!VyFloodFillManager.workers) VyFloodFillManager.initializeWorkers(count);
        else if (VyFloodFillManager.workers.length !== count) VyFloodFillManager.initializeWorkers(count);

        return VyFloodFillManager.workers;
    }

    static getWorkerCount() {
        return VyFloodFillManager.workers.length;
    }

    static setWorkerCount(count: number) {
        VyFloodFillManager.initializeWorkers(count);
    }
}
