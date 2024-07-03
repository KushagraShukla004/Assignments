import { cn } from "../../../lib/utils.tsx";
import PropTypes from "prop-types";
const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white text-black shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

export default Card;
