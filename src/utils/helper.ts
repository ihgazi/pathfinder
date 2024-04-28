import { CellInterface } from "../types";

export const singleCell: CellInterface = {
    cellNumber: 0,
    col: 0,
    row: 0,
};

export const getCellMatrix = (
    rowDim: number,
    colDim: number,
    grid?: CellInterface[][]
): CellInterface[][] => {
    const cellMatrix: CellInterface[][] = grid || [];
    let cellNumber = 0;

    for (let rowInd = 0; rowInd < rowDim; rowInd++) {
        const currentRow: CellInterface[] = [];
        for (let colInd = 0; colInd < colDim; colInd++) {
            currentRow.push({
                ...singleCell,
                row: rowInd,
                col: colInd,
                cellNumber: cellNumber,
            });
            cellNumber++;
        }
        cellMatrix.push(currentRow);
    }

    return cellMatrix;
};
