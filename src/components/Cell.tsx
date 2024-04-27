import React, { HTMLAttributes } from "react";
import { CellInterface } from "../types";

// Grid Cell Component
const Cell: React.FC<CellInterface & HTMLAttributes<HTMLDivElement>> = ({
    cellNumber,
    col,
    row,
    ...props
}) => {
    return (
        <div
            className={
                "w-full m-0.25 inline-flex justify-center items-center aspect-square border-[0.5px] border-indigo-300"
            }
        ></div>
    );
};

export default Cell;
