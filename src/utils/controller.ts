import { RenderRate, AnimateSpeed } from "../types";

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

        



