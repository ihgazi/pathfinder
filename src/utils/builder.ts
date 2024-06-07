import { CoordinatePair, CellInterface } from "../types";
import { getStartFinishCell } from "./randomizer";

/* Generic cell variable */
export const singleCell: CellInterface = {
    cellNumber: 0,
    col: 0,
    row: 0,
    isWall: false,
    isStartPoint: false,
    isEndPoint: false,
    distanceFromStart: Infinity,
    totalDistance: Infinity,
    previousCell: null,
    isVisited: false,
};

/* Clear current grid or create a new grid */
export const getCellMatrix = (
    rowDim: number,
    colDim: number,
    initialCoord: CoordinatePair,
    resetWalls: boolean = false,
    grid?: CellInterface[][]
): CellInterface[][] => {
    const cellMatrix: CellInterface[][] = grid || [];
    //const initialCoord: CoordinatePair = getStartFinishCell(rowDim, colDim);
    let cellNumber = 0;

    for (let rowInd = 0; rowInd < rowDim; rowInd++) {
        const currentRow: CellInterface[] = [];
        for (let colInd = 0; colInd < colDim; colInd++) {
            if (resetWalls && grid) {
                const cell = grid[rowInd][colInd];
                cell.isWall = false;
                cell.isVisited = false;
                cell.previousCell = null;
                let item = document.getElementById(`cell-${rowInd}-${colInd}`);
                item!.className = getClassName(cell.isStartPoint, cell.isEndPoint);
            } else {
                currentRow.push({
                    ...singleCell,
                    row: rowInd,
                    col: colInd,
                    cellNumber: cellNumber,
                    isStartPoint:
                        rowInd === initialCoord.startRow &&
                        colInd === initialCoord.startCol,
                    isEndPoint:
                        rowInd === initialCoord.endRow &&
                        colInd === initialCoord.endCol,
                });
            }
            cellNumber++;
        }
        if (!resetWalls) cellMatrix.push(currentRow);
    }

    return cellMatrix;
};

export const getClassName = (
    isStartPoint: boolean,
    isEndPoint: boolean
): string => {
    const className: string = `cell ${isStartPoint ? "cell-start" : ""} ${
        isEndPoint ? "cell-end" : ""
    }`;
    
    return className;
};

export const buildWall = (
    grid: CellInterface[][],
    row: number,
    col: number
) => {
    let item = document.getElementById(`cell-${row}-${col}`);
    if (grid[row][col].isWall) {
        grid[row][col].isWall = false;
        item!.className = "cell";
    }
    else {
        grid[row][col].isWall = true;
        item!.className = "cell cell-wall";
    }
}
