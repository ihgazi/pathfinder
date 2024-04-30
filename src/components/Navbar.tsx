import React, { HTMLAttributes } from "react";
import "./Navbar.css";
import { visualizeAlgo } from "../utils/animator";
import { CellInterface, CoordinatePair } from "../types";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    clearGrid: () => void;
    grid: CellInterface[][];
    setPathFound: (value: boolean) => void;
    initialCoord: CoordinatePair;
}

const Navbar: React.FC<NavbarProps> = ({
    clearGrid,
    grid,
    setPathFound,
    initialCoord,
    ...props
}) => {
    return (
        <div className="w-full flex flex-row bg-slate-800 justify-start items-center px-10 py-2">
            <div className="logo mr-10">PathFinder</div>
            <button
                type="button"
                className="btn btn-red mr-10"
                onClick={() => clearGrid()}
            >
                Clear Grid
            </button>
            <button
                type="button"
                className="btn bg-green-400"
                onClick={() => visualizeAlgo(grid, setPathFound, initialCoord)}
            >
                Run
            </button>
        </div>
    );
};

export default Navbar;
