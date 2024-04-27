import React, { useEffect, useState } from "react";
import { CellInterface } from "../types";
import { getCellMatrix } from "../utils/helper";
import Cell from "./Cell";

const GridBoard = () => {
    const gridBoardCells: CellInterface[][] = getCellMatrix();

    return (
        <>
            <div className="w-full justify-center items-center px-24">
            <div className="grid grid-cols-64 w-full justify-start items-center my-20">
                {gridBoardCells.map((row, rowInd) => {
                    return (
                        <React.Fragment key={rowInd}>
                            {row.map((cell, colInd) => {
                                return (
                                    <Cell {...cell}/>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </div>
            </div>
        </>
    );
            
}

export default GridBoard;
