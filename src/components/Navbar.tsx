import React, { HTMLAttributes, useState, useEffect } from "react";
import "./Navbar.css";
import { visualizeAlgo, animatePath } from "../utils/animator";
import { CellInterface, CoordinatePair, AlgorithmOption } from "../types";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    clearGrid: () => void;
    grid: CellInterface[][];
    initialCoord: CoordinatePair;
    animateFlag: boolean;
    setAnimateFlag: (value: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
    clearGrid,
    grid,
    initialCoord,
    animateFlag,
    setAnimateFlag,
    ...props
}) => {

    const [searchAlgo, setSearchAlgo] = useState<AlgorithmOption | null>(null);
    const [speed, setSpeed] = useState<"slow" | "medium" | "fast">("medium");
    const [pathFound, setPathFound] = useState(false);

    useEffect(() => {
        if (pathFound)
            animatePath(
                grid,
                initialCoord,
                (value) => setAnimateFlag(value)
            );
    }, [pathFound]);

    return (
        <div className="w-full flex flex-row bg-slate-800 justify-start items-center px-10 py-2">
            <div className="logo mr-10">PathFinder</div>
            <button
                type="button"
                className="btn btn-red mr-10"
                onClick={() => {
                    if (animateFlag) return;

                    setPathFound(false);
                    clearGrid();
                }}
            >
                Clear Grid
            </button>
            <button
                type="button"
                className="btn bg-green-400"
                onClick={() => {
                    if (animateFlag) return;

                    setAnimateFlag(true);
                    visualizeAlgo(grid, setPathFound, initialCoord);
                }}
            >
                Run
            </button>
        </div>
    );
};

export default Navbar;
