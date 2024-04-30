import React, { useRef, useState } from "react";
import { CellInterface, CoordinatePair, AlgorithmOption } from "../types";
import { getCellMatrix } from "../utils/builder";
import { getStartFinishCell } from "../utils/randomizer";
import Cell from "./Cell";
import Navbar from "../components/Navbar";
import { DFS } from "../utils/dfs";

const GridBoard = () => {
    // TODO: Bad fix. Use event listener for resize
    const viewWidth: number = window.innerWidth;
    const colDim: number = viewWidth > 1200 ? 64 : 32;
    const rowDim: number = 30;

    const initialCoord = useRef(getStartFinishCell(rowDim, colDim));
    const gridBoardCells = useRef(
        getCellMatrix(rowDim, colDim, initialCoord.current)
    );

    const [renderFlag, setRenderFlag] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const [searchAlgo, setSearchAlgo] = useState<AlgorithmOption | null>(null);
    const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");

    const handleDraw = (rowInd: number, colInd: number, click: boolean) => {
        setRenderFlag(!renderFlag);
        const cell: CellInterface = gridBoardCells.current[rowInd][colInd];
        if (!isMouseDown && !click) return;
        if (cell.isStartPoint || cell.isEndPoint) return;
        cell.isWall = !cell.isWall;
    };

    const clearGrid = () => {
        gridBoardCells.current = getCellMatrix(
            rowDim,
            colDim,
            initialCoord.current,
            true,
            gridBoardCells.current
        );
        setRenderFlag(!renderFlag);
    };

    const animateAlgo = (visitedCells: CellInterface[][]) => {
        for (let iter = 0; iter < visitedCells.length; iter++) {
            setTimeout(() => {
                visitedCells[iter].map((cell, idx) => {
                    if (cell.isEndPoint) {
                    }
                    let item = document.getElementById(
                        `cell-${cell.row}-${cell.col}`
                    );
                    item!.className = "cell cell-visited";
                });
            }, 10 * iter);
        }
    };

    const visualizeAlgo = () => {
        const grid = gridBoardCells.current;

        console.log(`${grid.length} ${grid[0].length}`);
        const startRow = initialCoord.current.startRow;
        const startCol = initialCoord.current.startCol;
        const startCell = grid[startRow][startCol];

        const visitedCells: CellInterface[][] = [];

        DFS(grid, visitedCells, startCell);

        console.log("Starting Animation!");
        animateAlgo(visitedCells);
    };
    return (
        <>
            <Navbar clearGrid={clearGrid} visualizeAlgo={visualizeAlgo} />
            <div className="w-full justify-center items-center px-24">
                <div
                    className={`grid w-full justify-start items-center mt-8 ${
                        colDim === 32 ? "grid-cols-32" : "grid-cols-64"
                    }`}
                >
                    {gridBoardCells.current.map((row, rowInd) => {
                        return (
                            <React.Fragment key={rowInd}>
                                {row.map((cell, colInd) => {
                                    return (
                                        <Cell
                                            key={colInd}
                                            id={`cell-${cell.row}-${cell.col}`}
                                            onMouseEnter={() => {
                                                //alert(`${rowInd} ${colInd} pressed`);
                                                handleDraw(
                                                    cell.row,
                                                    cell.col,
                                                    false
                                                );
                                            }}
                                            onMouseDown={() => {
                                                setIsMouseDown(true);
                                                handleDraw(
                                                    cell.row,
                                                    cell.col,
                                                    true
                                                );
                                            }}
                                            onMouseUp={() => {
                                                setIsMouseDown(false);
                                            }}
                                            {...cell}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default GridBoard;
