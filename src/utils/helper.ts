import { CoordinatePair, CellInterface } from "../types";
import { getStartFinishCell } from "./randomizer";

export const singleCell: CellInterface = {
    cellNumber: 0,
    col: 0,
    row: 0,
    isWall: false,
    isStartPoint: false,
    isEndPoint: false,
};

export const getCellMatrix = (
    rowDim: number,
    colDim: number,
    resetWalls: boolean = false,
    grid?: CellInterface[][]
): CellInterface[][] => {
    const cellMatrix: CellInterface[][] = grid || [];
    const initialCoord: CoordinatePair = getStartFinishCell(rowDim, colDim);
    let cellNumber = 0;

    for (let rowInd = 0; rowInd < rowDim; rowInd++) {
        const currentRow: CellInterface[] = [];
        for (let colInd = 0; colInd < colDim; colInd++) {
            if (resetWalls && grid) {
                grid[rowInd][colInd].isWall = false;
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
        cellMatrix.push(currentRow);
    }

    return cellMatrix;
};
