import { CellInterface, CoordinatePair, Edge } from "../../types";

// Alternate cells are taken edges
// Each edge is characterized by source cell
// destination cell and the edge cell connecting
// the two

const dx: number[] = [0, 0, 1, -1];
const dy: number[] = [1, -1, 0, 0];

const wallFill = (grid: CellInterface[][]) => {
    for (let i = 0; i < grid.length; i++)
        for (let j = 0; j < grid[0].length; j++) grid[i][j].isWall = true;
};

const compare = (x: number, y: number) => {
    if (x > y) return 1;
    else if (x < y) return -1;
    else return 0;
};

const isValid = (grid: CellInterface[][], row: number, col: number) => {
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length)
        return true;
    else return false;
};

const getDestination = (grid: CellInterface[][], edge: Edge) => {
    const opprow = edge.cell.row + compare(edge.cell.row, edge.source.row);
    const oppcol = edge.cell.col + compare(edge.cell.col, edge.source.col);
    if (isValid(grid, opprow, oppcol)) return grid[opprow][oppcol];
    else return null;
};

export const Prims = (
    grid: CellInterface[][],
    initialCoord: CoordinatePair
) => {
    wallFill(grid);

    const startRow = initialCoord.startRow;
    const startCol = initialCoord.startCol;

    const EdgeList: Edge[] = [];

    // Iterating through each direction
    for (let k = 0; k < 4; k++) {
        const row = startRow + dx[k];
        const col = startCol + dy[k];
        if (isValid(grid, row, col))
            EdgeList.push({
                source: grid[startRow][startCol],
                cell: grid[row][col],
            });
    }
    grid[startRow][startCol].isWall = false;

    while (EdgeList.length > 0) {
        // Select random edge
        const idx: number = Math.random() * EdgeList.length;
        const edge = EdgeList.splice(idx, 1)[0];

        const cell = edge.cell;
        const destination = getDestination(grid, edge);

        if (destination == null || !destination.isWall || !cell.isWall) continue;

        destination.isWall = false;
        cell.isWall = false;

        for (let k = 0; k < 4; k++) {
            const row = destination.row + dx[k];
            const col = destination.col + dy[k];
            if (isValid(grid, row, col) && grid[row][col].isWall) {
                EdgeList.push({ source: destination, cell: grid[row][col] });
            }
        }
    }

    grid[initialCoord.endRow][initialCoord.endCol].isWall = false;
};
