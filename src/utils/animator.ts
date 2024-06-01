import { CellInterface, CoordinatePair, RenderRate, AnimateSpeed, AlgorithmOption } from "../types";
import { getSpeedMultiplier } from "./controller";
import { Prims } from "./algorithms/prims";

const animateAlgo = (
    visitedCells: CellInterface[][],
    setPathFound: (value: boolean) => void,
    renderRate: RenderRate
) => {
    const speed = getSpeedMultiplier(renderRate).algoSpeed;
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
            speed * iter,
            iter
        );
        iter++;
    }

    setTimeout(() => {
        setPathFound(true);
    }, speed * iter);
};

// Animate path after visualizing algorithm
export const animatePath = (
    grid: CellInterface[][],
    initialCoord: CoordinatePair,
    setAnimateFlag: (value: boolean) => void,
    renderRate: RenderRate
) => {
    const endRow = initialCoord.endRow;
    const endCol = initialCoord.endCol;
    const endCell = grid[endRow][endCol];

    let cell = endCell;

    // If path does not exist return
    if (!cell.previousCell) {
        setAnimateFlag(false);
        return;
    }

    const speed = getSpeedMultiplier(renderRate).pathSpeed;
    // Iterating while current cell does not reach end of path
    let iter: number;
    for (iter = 0; ; iter++) {
        setTimeout(
            (row: number, col: number) => {
                let item = document.getElementById(`cell-${row}-${col}`);
                item!.className = "cell cell-path";
            },
            speed * iter,
            cell.row,
            cell.col
        );

        if (!cell.previousCell) break;
        else cell = cell.previousCell;
    }

    setTimeout(() => {
        setAnimateFlag(false);
    }, speed*iter);
};

export const visualizeAlgo = (
    grid: CellInterface[][],
    setFoundPath: (value: boolean) => void,
    initialCoord: CoordinatePair,
    renderRate: RenderRate,
    searchAlgo: AlgorithmOption
) => {
    //const startRow = initialCoord.startRow;
    //const startCol = initialCoord.startCol;
    //const startCell = grid[startRow][startCol];

    const visitedCells: CellInterface[][] = [];

    searchAlgo.onRun!(grid, visitedCells, initialCoord);
    
    //const animateSpeed = getSpeedMultiplier(speed);
    console.log("Starting Animation!");
    animateAlgo(visitedCells, setFoundPath, renderRate);
};


export const animateMaze = (
    grid: CellInterface[][],
    setAnimateFlag: (value: boolean) => void
) => {
    let iter = 0;
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            if (grid[row][col].isWall) {
                setTimeout((row: number, col: number) => {
                    let item = document.getElementById(`cell-${row}-${col}`);
                    item!.className = "cell cell-wall";
                }, iter*10, row, col);
                iter++;
            }
        }
    }
    
    setTimeout(() => {
        setAnimateFlag(false);
    }, iter*10);
};

export const visualizeMaze = (
    grid: CellInterface[][],
    initialCoord: CoordinatePair,
    setAnimateFlag: (value: boolean) => void,
) => {
    Prims(grid,initialCoord);
    animateMaze(grid,setAnimateFlag);
}
