import { CoordinatePair } from "../types";

export function getStartFinishCell(rowDim: number, colDim: number): CoordinatePair {
    // Set points initially at center of two halves
    let startRow: number = Math.floor(rowDim/4);
    let startCol: number = Math.floor(colDim/4);
    let endRow: number = Math.floor(3*rowDim/4);
    let endCol: number = Math.floor(3*colDim/4);

    let rowOffset = rowDim/2-1;
    let colOffset = colDim/2-1;
    startRow += Math.floor(Math.random()*rowOffset-rowOffset/2);
    startCol += Math.floor(Math.random()*colOffset-colOffset/2);
    endRow += Math.floor(Math.random()*rowOffset-rowOffset/2);
    endCol += Math.floor(Math.random()*colOffset-colOffset/2);

    return {startRow, startCol, endRow, endCol};
}

