/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCycle } from "framer-motion";

{
  /* object destructuring 101:
  when you pass icon={House} to NavItem, within NavItem, Icon will refer to House. This renaming is helpful when you want to use a different name inside the component than the name of the prop passed to it. 
  */
}
const NavItem = ({ icon: Icon, text, link }) => {
  const [iconHover, cycleIconHover] = useCycle(false, true);
  const containerVariants = {
    hover: {
      perspective: 1000,
      transform: "scale(1.05)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    rest: {
      perspective: 1000,
      transform: "scale(1)",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    open: {
      opacity: 1,
      display: "block",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      display: "none",
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="rest"
      whileHover="hover"
      onHoverStart={() => cycleIconHover()}
      onHoverEnd={() => cycleIconHover()}
    >
      <Link
        to={link}
        className="flex transform cursor-pointer items-center hover:w-[20rem] hover:rounded-l-xl hover:bg-fuchsia-600"
      >
        {Icon && (
          <Icon
            size={40}
            className="px-2"
            strokeWidth={iconHover ? "2" : "1"}
          />
        )}

        {iconHover && (
          <motion.span
            variants={iconVariants}
            initial="closed"
            animate="open"
            className="px-2 font-bold tracking-widest"
          >
            {text}
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
};

export default NavItem;
