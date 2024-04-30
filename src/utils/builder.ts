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
                item!.className = getClassName(cell.isWall, cell.isStartPoint, cell.isEndPoint);
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
    isWall: boolean,
    isStartPoint: boolean,
    isEndPoint: boolean
): string => {
    const className: string = `cell ${isStartPoint ? "cell-start" : ""} ${
        isEndPoint ? "cell-end" : ""
    } ${isWall ? "cell-wall" : ""}`;
    
    return className;
};

export const getCellPath = (
    endCell: CellInterface
): CellInterface[] => {
    const cellPath: CellInterface[] = [];

    let currentCell = endCell;
}
