export interface CellInterface {
    cellNumber: number;
    col: number;
    row: number;
    isWall: boolean;
    isStartPoint: boolean;
    isEndPoint: boolean;
    distanceFromStart: number;
    previousCell: CellInterface | null;
    isVisited: boolean;
}

export interface CoordinatePair {
    startRow: number;
    startCol: number;
    endRow: number;
    endCol: number;
}

export enum SearchingAlgo {
    DFS = "DFS"
}

export interface AlgorithmOption {
    name: string;
    type: SearchingAlgo;
    onClick: () => void;
}

export enum RenderRate {
    slow = "slow",
    medium = "medium",
    fast = "fast",
}

export interface AnimateSpeed {
    algoSpeed: number,
    pathSpeed: number,
}
