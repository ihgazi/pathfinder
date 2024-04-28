import React, { useRef, useState } from "react";
import { CellInterface } from "../types";
import { getCellMatrix } from "../utils/helper";
import Cell from "./Cell";
import { getStartFinishCell } from "../utils/randomizer";

const GridBoard = () => {
    // TODO: Bad fix. Use event listener for resize
    const viewWidth: number = window.innerWidth;
    const colDim: number = viewWidth > 1200 ? 64 : 32;
    const rowDim: number = 30;

    const gridBoardCells = useRef(getCellMatrix(rowDim, colDim));

    const [renderFlag, setRenderFlag] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const onMouseEnter = (rowInd: number, colInd: number) => {
        setRenderFlag(!renderFlag);
        const cell: CellInterface = gridBoardCells.current[rowInd][colInd];
        if (!isMouseDown) return;
        if (cell.isStartPoint || cell.isEndPoint) return;

        cell.isWall = true;
    };

    return (
        <>
            <div className="w-full justify-center items-center px-24">
                <div
                    className={`grid w-full justify-start items-center mt-20 ${
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
                                                onMouseEnter(
                                                    cell.row,
                                                    cell.col
                                                );
                                            }}
                                            onMouseDown={() => {
                                                setIsMouseDown(true);
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
