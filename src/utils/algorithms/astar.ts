import { CellInterface, CoordinatePair } from "../../types";

const dx: number[] = [0, 0, 1, -1];
const dy: number[] = [1, -1, 0, 0];

const isValid = (grid: CellInterface[][], row: number, col: number) => {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length && !grid[row][col].isWall)
        return true;
    else return false;
};

// Manhattan Distance heuristic
// Calculate distance based on 
// absolute difference between coordinates
const ManhattanDistance = (
    cell: CellInterface,
    initialCoord: CoordinatePair
) => {
    const x = Math.abs(cell.row - initialCoord.endRow);
    const y = Math.abs(cell.col - initialCoord.endCol);
    return x + y;
};

const updateDistance = (
    neighbour: CellInterface,
    currentCell: CellInterface,
    initialCoord: CoordinatePair
) => {
    neighbour.distanceFromStart = currentCell.distanceFromStart + 1;
    neighbour.totalDistance =
        neighbour.distanceFromStart +
        ManhattanDistance(neighbour, initialCoord);
    neighbour.previousCell = currentCell;
};

export const AStar = (
    grid: CellInterface[][],
    visitedCells: CellInterface[][],
    initialCoord: CoordinatePair
) => {
    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;
    const startCell = grid[startRow][startCol];

    // Add startCell to list
    const closestCells: CellInterface[] = [];
    startCell.distanceFromStart = 0;
    startCell.totalDistance = ManhattanDistance(startCell, initialCoord);
    closestCells.push(startCell);

    while (closestCells.length > 0) {
        // Find closest cell based on heuristic distance
        // TODO: Implement using priority queue
        closestCells.sort((a, b) => a.totalDistance - b.totalDistance);
        const currentCell = closestCells.shift();
        const distance = currentCell.distanceFromStart + 1;

        console.log(`${currentCell.row} ${currentCell.col}`);

        currentCell.isVisited = true;
        visitedCells.push([currentCell]);
        if (currentCell.isEndPoint) return;

        for (let k = 0; k < 4; k++) {
            const row = currentCell.row + dx[k];
            const col = currentCell.col + dy[k];

            // If cell has not been visited before add cell to list
            if (isValid(grid, row, col) && grid[row][col].totalDistance===Infinity) {
                const neighbour = grid[row][col];
                updateDistance(neighbour, currentCell, initialCoord);
                closestCells.unshift(neighbour);
            } 
            // If cell has been visited update cell distance
            else if (isValid(grid, row, col) && 
                       grid[row][col].distanceFromStart > distance) {
                updateDistance(grid[row][col], currentCell, initialCoord);

            }
        }
    }
};
