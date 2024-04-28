import React, { useEffect, useState } from "react";
import { CellInterface } from "../types";
import { getCellMatrix } from "../utils/helper";
import Cell from "./Cell";

const GridBoard = () => {
    // TODO: Bad fix. Use event listener for resize
    const viewWidth: number = window.innerWidth;
    const colDim = viewWidth > 1200 ? 64 : 32;

    const gridBoardCells: CellInterface[][] = getCellMatrix(30, colDim);
    return (
        <>
            <div className="w-full justify-center items-center px-24">
                <div
                    className={`grid grid-cols-${colDim} w-full justify-start items-center mt-20`}
                >
                    {gridBoardCells.map((row, rowInd) => {
                        return (
                            <React.Fragment key={rowInd}>
                                {row.map((cell, colInd) => {
                                    return <Cell {...cell} />;
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
