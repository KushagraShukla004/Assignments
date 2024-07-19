/* eslint-disable react/prop-types */

import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const Card = ({ className, children }) => {
  return (
    <div
      className={twMerge(
        clsx(
          "w-[95%] rounded-xl border-t-4 border-fuchsia-700 p-6 shadow-sm shadow-fuchsia-600 phone:min-w-[20rem] lg:w-[75%]",
          className,
        ),
      )}
    >
      {children}
    </div>
  );
};

export default Card;
