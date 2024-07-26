import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  UserRoundPlus,
  CircleUserRound,
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

  // Close dropdown when sidebar is not hovered
  useEffect(() => {
    if (!sidebarHover) {
      setDropdownOpen(false);
    }
  }, [sidebarHover]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownOpen((prev) => !prev);
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
      setDropdownOpen(false); // Close the dropdown
      setShowSidebar(false); // Ensure the sidebar is closed
      cycleSidebarHover(0); // Ensure sidebarHover is set to false
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
              className={`px-2 text-3xl tracking-widest hover:max-sm:hidden`}
            >
              <Link to="/">Shopify</Link>
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
          text="FAVORITES"
          link="/favorite"
          sidebarHover={sidebarHover}
        />
      </div>

      {/* Profile and dailog box */}
      {userInfo && (
        <div className="relative">
          {sidebarHover ? (
            <button
              onClick={toggleDropdown}
              className={`flex items-center justify-between rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-2 text-gray-800 transition-all duration-300 ease-in-out focus:outline-none ${
                sidebarHover && userInfo
                  ? "w-48 opacity-100"
                  : "pointer-events-none w-14 opacity-0"
              }`}
            >
              {userInfo && (
                <span
                  className={`flex w-full items-start truncate font-semibold tracking-tight text-white transition-transform`}
                >
                  {userInfo.username}
                </span>
              )}
              {userInfo && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${dropdownOpen ? "rotate-180 transform" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              )}
            </button>
          ) : (
            <CircleUserRound
              size={40}
              className="px-2 transition-transform duration-300 ease-in-out"
              strokeWidth={2}
            />
          )}

          {sidebarHover && dropdownOpen && userInfo && (
            <ul
              className={`absolute -right-10 mr-14 rounded-md border-[1px] border-gray-800 bg-[#1e1e21] text-white shadow-[inset_0px_2px_0px_1px_#a855f7] ${
                !userInfo.isAdmin ? "-top-20" : "-top-[282px]"
              } `}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:rounded-t-md hover:bg-gray-600"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-600"
                    >
                      Create Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-600"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-600"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-600"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-600"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  className="block w-full px-4 py-2 text-left hover:rounded-b-md hover:bg-gray-600"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      )}

      {/* Profile end */}
      {!userInfo && (
        <ul className="py-2">
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
      )}
    </motion.div>
  );
};

export default Navigation;
