import React , { HTMLAttributes } from "react";
import "./Navbar.css";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {
    clearGrid: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
    clearGrid,
    ...props
}) => {
    return (
        <div className="w-full flex flex-row bg-slate-800 justify-start items-center px-10 py-2">
            <div 
                className="logo mr-10">
                PathFinder
            </div>
            <button
                type="button"
                className="btn btn-red"
                onClick={() => clearGrid()}
            >
                Clear Grid
            </button>
        </div>
    )
}

export default Navbar;
    
