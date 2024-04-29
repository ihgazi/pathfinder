export interface CellInterface {
    cellNumber: number;
    col: number;
    row: number;
    isWall: boolean;
    isStartPoint: boolean;
    isEndPoint: boolean;
    distanceFromStart: number;
    previousCell: CellInterface | null;
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
