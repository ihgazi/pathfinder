import React, { HTMLAttributes } from "react";
import { RenderRate, AnimateSpeed } from "../types";

interface SpeedProps extends HTMLAttributes<HTMLDivElement> {
    speed: RenderRate;
    setSpeed: (value: RenderRate) => void;
}

export const SpeedController: React.FC<SpeedProps> = ({ speed, setSpeed }) => {
    return (
        <div className="hs-dropdown relative inline-flex ml-10">
            <button
                id="hs-dropdown-example"
                type="button"
                className="hs-dropdown-toggle btn inline-flex items-center gap-x-2 bg-white"
            >
                {speed}
                <svg
                    className="hs-dropdown-open:rotate-180 size-4 text-gray-600 dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <path d="m6 9 6 6 6-6"></path>
                </svg>
            </button>

            <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden z-10 mt-2 bg-white shadow-md rounded-md p-2"
                aria-labelledby="hs-dropdown-example"
            >
                <button className="btn btn-dropdown" onClick={() => setSpeed(RenderRate.slow)}>
                    slow
                </button>
                <button className="btn btn-dropdown" onClick={() => setSpeed(RenderRate.medium)}>
                    medium
                </button>
                <button className="btn btn-dropdown" onClick={() => setSpeed(RenderRate.fast)}>
                    fast
                </button>

            </div>
        </div>
    );
};
