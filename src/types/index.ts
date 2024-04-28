export interface CellInterface {
    cellNumber: number;
    col: number;
    row: number;
    isWall: boolean;
    isStartPoint: boolean;
    isEndPoint: boolean;
}

export interface CoordinatePair {
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number;
}
