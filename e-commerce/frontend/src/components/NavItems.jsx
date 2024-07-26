/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FavoritesCount from "../pages/Products/FavoritesCount";

{
  /* object destructuring 101:
  when you pass icon={House} to NavItem, within NavItem, Icon will refer to House. This renaming is helpful when you want to use a different name inside the component than the name of the prop passed to it. 
  */
}

const NavItem = ({ icon: Icon, text, link, sidebarHover }) => {
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
  const textVariants = {
    open: {
      opacity: 1,
      display: "block",
      transition: { delay: 0.2, duration: 0.2, ease: "easeInOut" },
    },
    closed: {
      opacity: 0,
      display: "none",
      transition: { delay: 0.2, duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <motion.div variants={containerVariants} initial="rest" whileHover="hover">
      <Link
        to={link}
        className="flex transform cursor-pointer items-center from-purple-500 from-5% to-indigo-500 to-90% hover:w-[42rem] hover:rounded-l-xl hover:bg-gradient-to-r"
      >
        {text === "FAVORITES" && <FavoritesCount />}
        {Icon && <Icon size={40} className="px-2" strokeWidth={2} />}

        {sidebarHover && (
          <motion.span
            variants={textVariants}
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
