/* eslint-disable react/prop-types */
import { Star, StarHalf } from "lucide-react";
import clsx from "clsx";

const Ratings = ({ value = 0, text = "", color = "yellow-500" }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <Star
          key={index}
          className={clsx(`ml-1`, `hover:fill-yellow-500`, {
            [`fill-${color}`]: color,
          })}
        />
      ))}

      {halfStars === 1 && (
        <StarHalf className={clsx(`ml-1`, { [`fill-${color}`]: color })} />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <Star
          key={index}
          className={clsx(`ml-1`, { [`fill-${color}`]: color })}
        />
      ))}

      <span className={clsx(`ml-[1rem]`, { [`text-${color}`]: color })}>
        {text && text}
      </span>
    </div>
  );
};

export default Ratings;
