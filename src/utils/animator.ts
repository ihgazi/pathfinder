import { CellInterface, CoordinatePair } from "../types";
import { DFS } from "../utils/dfs";

const animateAlgo = (
    visitedCells: CellInterface[][],
    setPathFound: (value: boolean) => void
) => {
    let iter: number = 0;
    while (iter < visitedCells.length) {
        setTimeout(
            (iter: number) => {
                visitedCells[iter].map((cell, idx) => {
                    let item = document.getElementById(
                        `cell-${cell.row}-${cell.col}`
                    );
                    item!.className = "cell cell-visited";
                });
            },
            10 * iter,
            iter
        );
        iter++;
    }

    setTimeout(() => {
        setPathFound(true);
    }, 10 * iter);
};

// Animate path after visualizing algorithm
export const animatePath = (
    grid: CellInterface[][],
    initialCoord: CoordinatePair,
    setAnimateFlag: (value: boolean) => void,
) => {
    const endRow = initialCoord.endRow;
    const endCol = initialCoord.endCol;
    const endCell = grid[endRow][endCol];

    let cell = endCell;

    // If path does not exist return
    if (!cell.previousCell) {
        return;
    }

    // Iterating while current cell does not reach end of path
    let iter: number;
    for (iter = 0; ; iter++) {
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
    }

    setTimeout(() => {
        setAnimateFlag(false);
    }, 25*iter);
};

export const visualizeAlgo = (
    grid: CellInterface[][],
    setFoundPath: (value: boolean) => void,
    initialCoord: CoordinatePair,
) => {
    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;
    const startCell = grid[startRow][startCol];

    const visitedCells: CellInterface[][] = [];

    DFS(grid, visitedCells, startCell);

    console.log("Starting Animation!");
    animateAlgo(visitedCells, setFoundPath);
};
