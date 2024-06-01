import { CellInterface, CoordinatePair } from "../../types";

const dx: number[] = [0, 0, 1, -1];
const dy: number[] = [1, -1, 0, 0];

export const BFS = (
    grid: CellInterface[][],
    visitedCells: CellInterface[][],
    initialCoord: CoordinatePair
) => {
    // Bad implementation. O(N) dequeue
    // TODO: Implement queue interface using LL
    const queue: CellInterface[] = [];

    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;
    const startCell = grid[startRow][startCol];
    startCell.isVisited = true;

    queue.push(startCell);
    let endReached: boolean = false;

    for (let iter = 0; !endReached && queue.length > 0; iter++) {
        const sz: number = queue.length;
        //visitedCells.push([]);
        console.log(iter);

        for (let i = 0; i < sz; i++) {
            const cell = queue[0];
            queue.shift();

            for (let j = 0; j < 4; j++) {
                const row = cell.row + dx[j];
                const col = cell.col + dy[j];

                if (
                    row >= 0 &&
                    row < grid.length &&
                    col >= 0 &&
                    col < grid[0].length
                ) {
                    const nextCell = grid[row][col];
                    if (nextCell.isVisited || nextCell.isWall) continue;
                    nextCell.isVisited = true;
                    visitedCells.push([nextCell]);
                    queue.push(nextCell);
                    nextCell.previousCell = cell;
                    if (nextCell.isEndPoint) endReached = true;
                }
            }
        }
    }
};
