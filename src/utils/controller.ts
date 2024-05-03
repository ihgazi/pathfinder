import { RenderRate, AnimateSpeed, SearchingAlgo, AlgorithmOption } from "../types";
import { DFS } from "./algorithms/dfs";

// Controller functions for speed and algorithm selection

export const getSpeedMultiplier = (speed: RenderRate): AnimateSpeed => {
    switch (speed) {
        case RenderRate.slow:
            return {
                algoSpeed: 100,
                pathSpeed: 125,
            };
        case RenderRate.medium:
            return {
                algoSpeed: 10,
                pathSpeed: 20,
            };
        default:
            return {
                algoSpeed: 3,
                pathSpeed: 10,
            };
    }
};

export const getAlgorithmOption = (algo: SearchingAlgo | null): AlgorithmOption => {
    switch (algo) {
        case (SearchingAlgo.DFS):
            return {
               name: "Depth-First Search",
               type: SearchingAlgo.DFS,
               onRun: DFS
            };
        default: 
            return {
                name: "Select an algorithm!",
                type: null,
            };
        }
};

