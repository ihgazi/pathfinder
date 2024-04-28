import React, { HTMLAttributes } from "react";
import { CellInterface } from "../types";

// Grid Cell Component
const Cell: React.FC<CellInterface & HTMLAttributes<HTMLDivElement>> = ({
    cellNumber,
    col,
    row,
    isWall,
    isStartPoint,
    isEndPoint,
    ...props
}) => {
    return (
        <div
            className={
                `w-full inline-flex justify-center items-center aspect-square border-[0.5px] border-indigo-300 ${
                    isStartPoint ? "bg-green-600" : ""
                } ${isEndPoint ? "bg-red-600": ""}
            `}
        ></div>
    );
};

export default Cell;
