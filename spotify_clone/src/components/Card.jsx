import { cn } from "../lib/utils.tsx";
import PropTypes from "prop-types";
const Card = ({ className, children }) => {
  return (
    <di
      className={cn(
        "rounded-lg border bg-white text-black shadow-sm",
        className,
      )}
    >
      {children}
    </di>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};

export default Card;
