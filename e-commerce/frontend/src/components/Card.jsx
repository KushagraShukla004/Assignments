/* eslint-disable react/prop-types */

import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "relative h-64 w-48 overflow-hidden rounded-xl bg-[#3d3c3d] drop-shadow-xl",
          className,
        ),
      )}
    >
      <div
        className={twMerge(
          clsx(
            "absolute inset-0.5 z-[1] flex items-center justify-center rounded-xl bg-[#323132] text-white opacity-90",
            className,
          ),
        )}
      >
        {children}
      </div>
      <div
        className={twMerge(
          clsx(
            "absolute -left-1/2 -top-1/2 h-48 w-56 bg-white blur-[50px]",
            className,
          ),
        )}
      ></div>
    </div>
  );
};

export default Card;
