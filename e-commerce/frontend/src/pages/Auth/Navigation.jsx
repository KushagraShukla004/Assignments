/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
//logo
import LogoFilled from "../../assets/s_filled96.png";
//Icons
import {
  House,
  ShoppingCart,
  Heart,
  Store,
  LogIn,
  LogOut,
  UserRoundPlus,
} from "lucide-react";
import { useCycle } from "framer-motion";
import NavItem from "../../components/NavItems";

const Navigation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [iconHover, cycleIconHover] = useCycle(false, true);
  const [sidebarHover, cycleSidebarHover] = useCycle(false, true);

  const toggleDropdown = () => {
    setDropdownOpen((pv) => !pv);
  };

  const sidebarVariants = {
    open: {
      width: "15rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      width: "5rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className={`z-[999] ${showSidebar ? "hidden" : "flex"} flex h-screen w-[10%] flex-col justify-between overflow-hidden rounded-r-3xl bg-zinc-800 p-4 text-white max-phone:hidden`}
      variants={sidebarVariants}
      initial="closed"
      whileHover="open"
      onHoverStart={cycleSidebarHover}
      onHoverEnd={cycleSidebarHover}
    >
      <div className="flex flex-col space-y-7">
        <motion.div className="flex cursor-pointer items-center">
          <motion.img
            src={LogoFilled}
            alt="Logo1"
            //trick: use invert to change a black image into white or vice versa
            className="z-[999] size-10 invert"
          />

          {sidebarHover && (
            <motion.h1
              initial={{ opacity: 0, display: "none" }}
              animate={{ opacity: 1, display: "block" }}
              transition={{ delay: 0.2, duration: 0.2, ease: "easeInOut" }}
              className={`px-2 text-3xl tracking-wide ${sidebarHover && "block"} hover:max-sm:hidden`}
              style={{ display: sidebarHover ? "block" : "none" }}
            >
              Shopify
            </motion.h1>
          )}
        </motion.div>
        <NavItem icon={House} text="HOME" link="/" />
        <NavItem icon={Store} text="SHOP" link="/shop" />
        <NavItem icon={ShoppingCart} text="CART" link="/cart" />
        <NavItem icon={Heart} text="Favorites" link="/favorite" />
      </div>

      <ul>
        <li>
          <NavItem icon={LogIn} text="LogIn" link="/login" />
          <NavItem icon={UserRoundPlus} text="Register" link="/register" />
        </li>
      </ul>
    </motion.div>
  );
};

export default Navigation;
