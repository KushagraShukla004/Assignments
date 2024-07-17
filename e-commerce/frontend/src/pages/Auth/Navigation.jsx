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
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [sidebarHover, cycleSidebarHover] = useCycle(false, true);

  const toggleDropdown = () => {
    setDropdownOpen((pv) => !pv);
  };

  const sidebarVariants = {
    open: {
      width: "15rem",
      transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.25 },
    },
    closed: {
      width: "5rem",
      transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.25 },
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <motion.div
      className={`z-[9999] ${showSidebar ? "hidden" : "flex"} fixed flex h-screen w-[10%] flex-col justify-between overflow-hidden rounded-r-3xl bg-zinc-800 p-4 text-white max-phone:hidden`}
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
            className="z-[999] size-10 invert"
          />

          {sidebarHover && (
            <motion.h1
              variants={textVariants}
              initial="closed"
              animate="open"
              className={`px-2 text-3xl tracking-wide hover:max-sm:hidden`}
            >
              Shopify
            </motion.h1>
          )}
        </motion.div>
        <NavItem
          icon={House}
          text="HOME"
          link="/"
          sidebarHover={sidebarHover}
        />
        <NavItem
          icon={Store}
          text="SHOP"
          link="/shop"
          sidebarHover={sidebarHover}
        />
        <NavItem
          icon={ShoppingCart}
          text="CART"
          link="/cart"
          sidebarHover={sidebarHover}
        />
        <NavItem
          icon={Heart}
          text="Favorites"
          link="/favorite"
          sidebarHover={sidebarHover}
        />
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <span className="text-white">{userInfo.username}</span>
          ) : (
            <></>
          )}
        </button>
      </div>

      <ul>
        <li>
          <NavItem
            icon={LogIn}
            text="LogIn"
            link="/login"
            sidebarHover={sidebarHover}
          />
          <NavItem
            icon={UserRoundPlus}
            text="Register"
            link="/register"
            sidebarHover={sidebarHover}
          />
        </li>
      </ul>
    </motion.div>
  );
};

export default Navigation;
