import { CellInterface, CoordinatePair } from "../types";
import { DFS } from "../utils/dfs";

const animateAlgo = (
    visitedCells: CellInterface[][],
    setPathFound: (value: boolean) => void
) => {
    for (let iter = 0; iter < visitedCells.length; iter++) {
        setTimeout(() => {
            visitedCells[iter].map((cell, idx) => {
                if (cell.isEndPoint) {
                    setPathFound(true);
                }
                let item = document.getElementById(
                    `cell-${cell.row}-${cell.col}`
                );
                item!.className = "cell cell-visited";
            });
        }, 10 * iter);
    }
};

export const animatePath = (grid: CellInterface[][], initialCoord: CoordinatePair) => {
    const endRow = initialCoord.endRow;
    const endCol = initialCoord.endCol;
    const endCell = grid[endRow][endCol];

    let cell = endCell;

    // Iterating while current cell does not reach end of path
    for (let iter = 1; ; iter++) {
        console.log(`${cell.row} ${cell.col}`);
        setTimeout(
            (row: number, col: number) => {
                let item = document.getElementById(`cell-${row}-${col}`);
                item!.className = "cell cell-path";
            },
            25 * iter,
            cell.row,
            cell.col
        );

        if (!cell.previousCell) break;
        else cell = cell.previousCell;
        iter++;
    }
};

export const visualizeAlgo = (
    grid: CellInterface[][],
    setFoundPath: (value: boolean) => void,
    initialCoord: CoordinatePair
) => {
    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;
    const startCell = grid[startRow][startCol];

    const visitedCells: CellInterface[][] = [];

    DFS(grid, visitedCells, startCell);

    console.log("Starting Animation!");
    animateAlgo(visitedCells, setFoundPath);
};
