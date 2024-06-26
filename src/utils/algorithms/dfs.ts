import { CellInterface, CoordinatePair } from "../../types";

const dx: number[] = [0,0,1,-1];
const dy: number[] = [1,-1,0,0];

// Recursive DFS Function
export const DFS = (
    grid: CellInterface[][],
    visitedCells: CellInterface[][],
    initialCoord: CoordinatePair,
) => {
    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;
    const startCell = grid[startRow][startCol];

    search(grid, visitedCells, startCell);
}

const search = (
    grid: CellInterface[][],
    visitedCells: CellInterface[][],
    currentCell: CellInterface
): boolean => {
    //console.log(`${currentCell.row} ${currentCell.col}`);
    currentCell.isVisited = true;
    visitedCells.push([currentCell]);
    if (currentCell.isEndPoint) return true;

    for (let i = 0; i < 4; i++) {
        const row = currentCell.row+dy[i];
        const col = currentCell.col+dx[i];

        if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
            const nextCell: CellInterface = grid[row][col];
            if (nextCell.isVisited || nextCell.isWall) continue;
            nextCell.previousCell = currentCell;
            if (search(grid, visitedCells, nextCell)) return true;
        }
    }

    return false;
}
