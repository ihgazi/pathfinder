import React, { useRef, useState, useEffect } from "react";
import { CellInterface, CoordinatePair  } from "../types";
import { getCellMatrix, buildWall } from "../utils/builder";
import { getStartFinishCell } from "../utils/randomizer";
import Cell from "./Cell";
import Navbar from "../components/Navbar";

const GridBoard = () => {
    // TODO: Bad fix. Use event listener for resize
    const viewWidth: number = window.innerWidth;
    const colDim: number = viewWidth > 1200 ? 96 : 48;
    const rowDim: number = 42;

    const initialCoord = useRef(getStartFinishCell(rowDim, colDim));
    const gridBoardCells = useRef(
        getCellMatrix(rowDim, colDim, initialCoord.current)
    );

    // animateFlag blocks all actions during animation
    const [animateFlag, setAnimateFlag] = useState(false);
    //const [renderFlag, setRenderFlag] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleDraw = (rowInd: number, colInd: number, click: boolean) => {
        if (animateFlag) return;

        if (click) console.log(`${rowInd} ${colInd}`);
        const cell: CellInterface = gridBoardCells.current[rowInd][colInd];
        if (!isMouseDown && !click) return;
        if (cell.isStartPoint || cell.isEndPoint) return;
        buildWall(gridBoardCells.current, rowInd, colInd);
    };

    const clearGrid = () => {
        gridBoardCells.current = getCellMatrix(
            rowDim,
            colDim,
            initialCoord.current,
            true,
            gridBoardCells.current
        );
    };

    return (
        <>
            <Navbar
                clearGrid={clearGrid}
                grid={gridBoardCells.current}
                initialCoord={initialCoord.current}
                animateFlag={animateFlag}
                setAnimateFlag={(value) => setAnimateFlag(value)}
            />
            <div className="w-full justify-center items-center px-2">
                <div
                    className={`grid w-full justify-center items-center mt-8 ${
                        colDim === 96 ? "grid-cols-96" : "grid-cols-48"
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
