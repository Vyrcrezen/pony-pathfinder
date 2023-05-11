export default interface BeginStory {
    storyPlaythroughId: number;
    storyPlaythroughToken: string;
    message: string;
    playthroughState: {
        storyTitle: string;
        currentLevel: number;
        isCurrentLevelFinished: boolean;
        currentMapStatus: "CREATED";
        storyLine: string;
    };
}
