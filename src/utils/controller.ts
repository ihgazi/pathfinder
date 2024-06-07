import { RenderRate, AnimateSpeed, SearchingAlgo, AlgorithmOption } from "../types";
import { DFS } from "./algorithms/dfs";
import { BFS } from "./algorithms/bfs";
import { AStar } from "./algorithms/astar";

// Controller functions for speed and algorithm selection

export const getSpeedMultiplier = (speed: RenderRate): AnimateSpeed => {
    switch (speed) {
        case RenderRate.slow:
            return {
                algoSpeed: 40,
                pathSpeed: 50,
            };
        case RenderRate.medium:
            return {
                algoSpeed: 30,
                pathSpeed: 40,
            };
        default:
            return {
                algoSpeed: 5,
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
        case (SearchingAlgo.BFS):
            return {
                name: "Breadth-First Search",
                type: SearchingAlgo.BFS,
                onRun: BFS
            };
        case (SearchingAlgo.AStar):
            return {
                name: "A* Search",
                type: SearchingAlgo.AStar,
                onRun: AStar
            };
        default:
            return {
                name: "Select an algorithm!",
                type: null,
            };
        }
};

