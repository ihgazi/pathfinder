import React, { HTMLAttributes } from "react";
import { CellInterface } from "../types";
import { getClassName } from "../utils/builder";

// Grid Cell Component
const Cell: React.FC<CellInterface & HTMLAttributes<HTMLDivElement>> = ({
    cellNumber,
    col,
    row,
    isWall,
    isStartPoint,
    isEndPoint,
    isVisited,
    previousCell,
    distanceFromStart,
    ...props
}) => {
    return (
        <div
            {...props}
            className={getClassName(isWall, isStartPoint, isEndPoint)}
        ></div>
    );
};

export default Cell;
