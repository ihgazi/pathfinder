import React, { useRef, useState } from "react";
import { CellInterface } from "../types";
import { getCellMatrix } from "../utils/helper";
import Cell from "./Cell";
import Navbar from "../components/Navbar";

const GridBoard = () => {
    // TODO: Bad fix. Use event listener for resize
    const viewWidth: number = window.innerWidth;
    const colDim: number = viewWidth > 1200 ? 64 : 32;
    const rowDim: number = 30;

    const gridBoardCells = useRef(getCellMatrix(rowDim, colDim));

    const [renderFlag, setRenderFlag] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleDraw = (rowInd: number, colInd: number, click: boolean) => {
        setRenderFlag(!renderFlag);
        const cell: CellInterface = gridBoardCells.current[rowInd][colInd];
        if (!isMouseDown && !click) return;
        if (cell.isStartPoint || cell.isEndPoint) return;

        cell.isWall = true;
    };

    const clearGrid = () => {
        gridBoardCells.current = getCellMatrix(rowDim, colDim, true, gridBoardCells.current);
    }

    return (
        <>
            <Navbar clearGrid = { clearGrid } />
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
                                                handleDraw(cell.row,cell.col,false);
                                            }}
                                            onMouseDown={() => {
                                                setIsMouseDown(true);
                                                handleDraw(cell.row,cell.col,true);
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
